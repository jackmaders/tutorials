import CustomFabricObject from "@/types/customFabricObject";
import { Canvas } from "fabric";

function modifyShape(
  canvas: Canvas,
  property: string,
  value: any,
  activeObjectRef: React.MutableRefObject<CustomFabricObject | null>,
  syncShapeInStorage: (shape: CustomFabricObject) => void,
) {
  const selectedElement = canvas.getActiveObject();

  if (!selectedElement || selectedElement?.type === "activeSelection") return;

  // if  property is width or height, set the scale of the selected element
  if (property === "width") {
    selectedElement.set("scaleX", 1);
    selectedElement.set("width", value);
  } else if (property === "height") {
    selectedElement.set("scaleY", 1);
    selectedElement.set("height", value);
  } else {
    if (selectedElement[property as keyof object] === value) return;
    selectedElement.set(property as keyof object, value);
  }

  // set selectedElement to activeObjectRef
  activeObjectRef.current = selectedElement;

  syncShapeInStorage(selectedElement);
}

export default modifyShape;
modifyShape;
