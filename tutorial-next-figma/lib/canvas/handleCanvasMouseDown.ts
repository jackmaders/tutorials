import { Canvas, FabricObject, TEvent } from "fabric";
import createSpecificShape from "../shapes/createSpecificShape";
import ShapeType from "@/constants/enums/shapeType.enum";

interface handleCanvasMouseDownProps {
  options: TEvent;
  canvas: Canvas;
  selectedShapeRef: React.MutableRefObject<ShapeType>;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: React.MutableRefObject<FabricObject | null>;
}

function handleCanvasMouseDown({
  options,
  canvas,
  selectedShapeRef,
  isDrawing,
  shapeRef,
}: handleCanvasMouseDownProps) {
  // get pointer coordinates
  const pointer = canvas.getScenePoint(options.e);

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
  if (selectedShapeRef.current === ShapeType.FREEFORM) {
    isDrawing.current = true;
    canvas.isDrawingMode = true;

    if (canvas.freeDrawingBrush) canvas.freeDrawingBrush.width = 5;

    return;
  }

  canvas.isDrawingMode = false;

  // if target is the selected shape or active selection, set isDrawing to false
  if (
    target &&
    (target.type === selectedShapeRef.current ||
      target.type === "activeSelection")
  ) {
    isDrawing.current = false;

    // set active object to target
    canvas.setActiveObject(target);

    /**
     * setCoords() is used to update the controls of the object
     * setCoords: http://fabricjs.com/docs/fabric.Object.html#setCoords
     */
    target.setCoords();
  } else {
    isDrawing.current = true;

    // create custom fabric object/shape and set it to shapeRef
    shapeRef.current = createSpecificShape(
      selectedShapeRef.current,
      pointer as any,
    );

    // if shapeRef is not null, add it to canvas
    if (shapeRef.current) {
      // add: http://fabricjs.com/docs/fabric.Canvas.html#add
      canvas.add(shapeRef.current);
    }
  }
}
export default handleCanvasMouseDown;
