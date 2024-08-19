import { Canvas, Point } from "fabric";
import createSpecificShape from "./createSpecificShape";
import FabricObjectType from "@/constants/enums/canvasObjectType.enum";

function createShape(
  canvas: Canvas,
  point: Point,
  shapeType: FabricObjectType,
) {
  if (shapeType === "freeform") {
    canvas.isDrawingMode = true;
    return null;
  }

  return createSpecificShape(shapeType, point);
}

export default createShape;
