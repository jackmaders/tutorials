import CustomFabricObject from "@/types/customFabricObject";
import { FabricObject, ModifiedEvent } from "fabric";

interface CanvasObjectModifiedProps {
  options: ModifiedEvent;
  syncShapeInStorage: (shape: CustomFabricObject) => void;
}

function handleCanvasObjectModified({
  options,
  syncShapeInStorage,
}: CanvasObjectModifiedProps) {
  const target = options.target as CustomFabricObject;
  if (!target) return;

  if (target?.type == "activeSelection") {
    // fix this
  } else {
    syncShapeInStorage(target);
  }
}

export default handleCanvasObjectModified;
