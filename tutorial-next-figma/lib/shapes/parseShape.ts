import ShapeType from "@/constants/enums/shapeType.enum";

function parseShape(value: string): ShapeType | undefined {
  if (Object.values(ShapeType).includes(value as ShapeType)) {
    return value as ShapeType;
  }
  return undefined;
}

export default parseShape;
