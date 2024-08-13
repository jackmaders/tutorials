import FabricObjectType from "@/constants/enums/canvasObjectType.enum";
import { Canvas, PencilBrush, TEvent } from "fabric";
import createSpecificShape from "../shapes/createSpecificShape";
import CustomFabricObject from "@/types/customFabricObject";

function handleCanvasMouseDown(
  options: TEvent,
  canvas: Canvas,
  isDrawing: React.MutableRefObject<boolean>,
  shapeRef: React.MutableRefObject<CustomFabricObject | null>,
  selectedShapeRef: React.MutableRefObject<FabricObjectType | null>,
  activeObjectRef: React.MutableRefObject<CustomFabricObject | null>,
) {
  // get pointer coordinates
  const point = canvas.getScenePoint(options.e);

  /**
   * get target object i.e., the object that is clicked
   * findtarget() returns the object that is clicked
   *
   * findTarget: http://fabricjs.com/docs/fabric.Canvas.html#findTarget
   */
  const target = canvas.findTarget(options.e);

  // set canvas drawing mode to false
  canvas.isDrawingMode = false;

  // if selected shape is freeform, set drawing mode to true and return
  if (selectedShapeRef.current === FabricObjectType.FREEFORM) {
    isDrawing.current = true;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new PencilBrush(canvas);

    if (canvas.freeDrawingBrush) canvas.freeDrawingBrush.width = 5;

    return;
  }

  canvas.isDrawingMode = false;

  // if target is the selected shape or active selection, set isDrawing to false
  if (
    target &&
    (target.type === selectedShapeRef.current || target.activeOn === "down")
  ) {
    isDrawing.current = false;

    // set active object to target
    canvas.setActiveObject(target);
    activeObjectRef.current = target as CustomFabricObject;

    /**
     * setCoords() is used to update the controls of the object
     * setCoords: http://fabricjs.com/docs/fabric.Object.html#setCoords
     */
    target.setCoords();
  } else if (selectedShapeRef.current) {
    isDrawing.current = true;

    // create custom fabric object/shape and set it to shapeRef
    shapeRef.current = createSpecificShape(selectedShapeRef.current, point);

    // if shapeRef is not null, add it to canvas
    if (shapeRef.current) {
      // add: http://fabricjs.com/docs/fabric.Canvas.html#add
      canvas.add(shapeRef.current);
    }
  }
}
export default handleCanvasMouseDown;
