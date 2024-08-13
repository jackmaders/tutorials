import CustomFabricObject from "@/types/customFabricObject";
import { Canvas, FabricObject } from "fabric";

function handleDelete(
  canvas: Canvas | undefined,
  deleteShapeFromStorage: (id: string) => void,
) {
  if (!canvas) return;

  const activeObjects: CustomFabricObject[] = canvas.getActiveObjects();

  if (!activeObjects || activeObjects.length === 0) return;

  if (activeObjects.length > 0) {
    activeObjects.forEach((obj) => {
      if (!obj.objectId) return;
      canvas.remove(obj);
      deleteShapeFromStorage(obj.objectId);
    });
  }

  canvas.discardActiveObject();
  canvas.requestRenderAll();
}

export default handleDelete;
