import ShapeType from "@/constants/enums/shapeType.enum";
import createCircle from "./createCircle";
import createLine from "./createLine";
import createRectangle from "./createRectangle";
import createText from "./createText";
import createTriangle from "./createTriangle";

function createSpecificShape(shapeType: ShapeType, pointer: PointerEvent) {
  switch (shapeType) {
    case ShapeType.RECTANGLE:
      return createRectangle(pointer);

    case ShapeType.TRIANGLE:
      return createTriangle(pointer);

    case ShapeType.CIRCLE:
      return createCircle(pointer);

    case ShapeType.LINE:
      return createLine(pointer);

    case ShapeType.TEXT:
      return createText(pointer, "Tap to Type");

    default:
      return null;
  }
}

export default createSpecificShape;
