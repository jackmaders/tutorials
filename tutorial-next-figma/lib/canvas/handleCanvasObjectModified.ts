import CustomFabricObject from "@/types/customFabricObject";
import { FabricObject, ModifiedEvent } from "fabric";

function handleCanvasObjectModified(
  options: ModifiedEvent,
  syncShapeInStorage: (shape: CustomFabricObject) => void,
) {
  const target = options.target as CustomFabricObject;
  if (!target) return;

  if (target?.type == "activeSelection") {
    // fix this
  } else {
    syncShapeInStorage(target);
  }
}

export default handleCanvasObjectModified;
