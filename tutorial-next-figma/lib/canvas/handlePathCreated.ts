import CustomFabricObject from "@/types/customFabricObject";
import { ModifiedEvent, Path } from "fabric";

function handlePathCreated(
  options: (ModifiedEvent & { path: CustomFabricObject<Path> }) | any,
  syncShapeInStorage: (shape: CustomFabricObject) => void,
) {
  // get path object
  const path = options.path;
  if (!path) return;

  // set unique id to path object
  path.set({
    objectId: crypto.randomUUID(),
  });

  // sync shape in storage
  syncShapeInStorage(path);
}

export default handlePathCreated;
