import FabricObjectType from "@/constants/enums/canvasObjectType.enum";
import createCircle from "./createCircle";
import createLine from "./createLine";
import createRectangle from "./createRectangle";
import createText from "./createText";
import createTriangle from "./createTriangle";
import CustomFabricObject from "@/types/customFabricObject";
import { Point } from "fabric";

function createSpecificShape(
  shapeType: FabricObjectType,
  pointer: Point,
): CustomFabricObject | null {
  switch (shapeType) {
    case FabricObjectType.RECTANGLE:
      return createRectangle(pointer);

    case FabricObjectType.TRIANGLE:
      return createTriangle(pointer);

    case FabricObjectType.CIRCLE:
      return createCircle(pointer);

    case FabricObjectType.LINE:
      return createLine(pointer);

    case FabricObjectType.TEXT:
      return createText(pointer, "Tap to Type");

    default:
      return null;
  }
}

export default createSpecificShape;
