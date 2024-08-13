import FabricObjectType from "@/constants/enums/canvasObjectType.enum";
import navbarItems from "@/constants/navbarItems";
import CustomFabricObject from "@/types/customFabricObject";
import NavbarItem from "@/types/navbarItem";
import { Canvas } from "fabric";

interface CanvasMouseUpProps {
  canvas: Canvas;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: React.MutableRefObject<CustomFabricObject | null>;
  activeObjectRef: React.MutableRefObject<CustomFabricObject | null>;
  selectedShapeRef: React.MutableRefObject<FabricObjectType | null>;
  syncShapeInStorage: (shape: CustomFabricObject | null) => void;
  handleActiveNavbarItem: (navbarItem: NavbarItem) => void;
}

function handleCanvasMouseUp({
  canvas,
  isDrawing,
  shapeRef,
  activeObjectRef,
  selectedShapeRef,
  syncShapeInStorage,
  handleActiveNavbarItem,
}: CanvasMouseUpProps) {
  isDrawing.current = false;

  if (selectedShapeRef.current === FabricObjectType.FREEFORM) return;

  // sync shape in storage as drawing is stopped
  syncShapeInStorage(shapeRef.current);

  // set everything to null
  shapeRef.current = null;
  // activeObjectRef.current = null;
  selectedShapeRef.current = null;

  // if canvas is not in drawing mode, set active element to default nav element after 700ms
  if (!canvas.isDrawingMode) {
    setTimeout(() => {
      handleActiveNavbarItem(navbarItems[0]);
    }, 700);
  }
}

export default handleCanvasMouseUp;
