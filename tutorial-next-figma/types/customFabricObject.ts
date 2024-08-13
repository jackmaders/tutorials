import { FabricObject } from "fabric";

type CustomFabricObject = FabricObject & {
  objectId: string;
};

export default CustomFabricObject;
