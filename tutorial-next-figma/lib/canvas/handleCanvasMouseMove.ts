import FabricObjectType from "@/constants/enums/canvasObjectType.enum";
import FabricShape from "@/constants/enums/shapeType.enum";
import CustomFabricObject from "@/types/customFabricObject";
import { Canvas, FabricObject, TEvent } from "fabric";

// handle mouse move event on canvas to draw shapes with different dimensions
function handleCanvasMouseMove(
  options: TEvent,
  canvas: Canvas,
  selectedShapeRef: React.MutableRefObject<FabricObjectType | null>,
  isDrawing: React.MutableRefObject<boolean>,
  shapeRef: React.MutableRefObject<CustomFabricObject | null>,
  syncShapeInStorage: (shape: FabricObject) => void,
) {
  // if selected shape is freeform, return
  if (!isDrawing.current) return;
  if (selectedShapeRef.current === "freeform") return;

  canvas.isDrawingMode = false;

  // get pointer coordinates
  const point = canvas.getScenePoint(options.e);

  // depending on the selected shape, set the dimensions of the shape stored in shapeRef in previous step of handelCanvasMouseDown
  // calculate shape dimensions based on pointer coordinates
  switch (selectedShapeRef?.current) {
    case FabricObjectType.RECTANGLE:
      shapeRef.current?.set({
        width: point.x - (shapeRef.current?.left || 0),
        height: point.y - (shapeRef.current?.top || 0),
      });
      break;

    case FabricObjectType.CIRCLE:
      shapeRef.current?.set({
        radius: Math.abs(point.x - (shapeRef.current?.left || 0)) / 2,
      });
      break;

    case FabricObjectType.TRIANGLE:
      shapeRef.current?.set({
        width: point.x - (shapeRef.current?.left || 0),
        height: point.y - (shapeRef.current?.top || 0),
      });
      break;

    case FabricObjectType.LINE:
      shapeRef.current?.set({
        x2: point.x,
        y2: point.y,
      });
      break;

    case FabricObjectType.IMAGE:
      shapeRef.current?.set({
        width: point.x - (shapeRef.current?.left || 0),
        height: point.y - (shapeRef.current?.top || 0),
      });

    default:
      break;
  }

  // render objects on canvas
  // renderAll: http://fabricjs.com/docs/fabric.Canvas.html#renderAll
  canvas.renderAll();

  // sync shape in storage
  if (shapeRef.current?.objectId) {
    syncShapeInStorage(shapeRef.current);
  }
}

export default handleCanvasMouseMove;
