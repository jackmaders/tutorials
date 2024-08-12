import FabricObjectType from "@/constants/enums/canvasObjectType.enum";

function parseShape(value: string): FabricObjectType | undefined {
  if (Object.values(FabricObjectType).includes(value as FabricObjectType)) {
    return value as FabricObjectType;
  }
  return undefined;
}

export default parseShape;
