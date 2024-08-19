import { FabricObject } from "fabric";

interface CustomFabricObject<T extends FabricObject = FabricObject>
  extends FabricObject<T> {
  objectId?: string;
}

export default CustomFabricObject;
