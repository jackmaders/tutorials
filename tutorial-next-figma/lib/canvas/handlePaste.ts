import CustomFabricObject from "@/types/customFabricObject";
import { Canvas, util } from "fabric";

function handlePaste(
  canvas: Canvas,
  syncShapeInStorage: (shape: CustomFabricObject) => void,
) {
  if (!canvas || !(canvas instanceof Canvas)) {
    console.error("Invalid canvas object. Aborting paste operation.");
    return;
  }

  // Retrieve serialized objects from the clipboard
  const clipboardData = localStorage.getItem("clipboard");

  if (clipboardData) {
    try {
      const parsedObjects = JSON.parse(clipboardData);
      parsedObjects.forEach((objData: Object) => {
        // convert the plain javascript objects retrieved from localStorage into fabricjs objects (deserialization)
        util.enlivenObjects([objData]).then((enlivenedObjects) => {
          enlivenedObjects.forEach((enlivenedObj) => {
            // Offset the pasted objects to avoid overlap with existing objects
            (enlivenedObj as CustomFabricObject).set({
              left: (enlivenedObj as CustomFabricObject).left || 0 + 20,
              top: (enlivenedObj as CustomFabricObject).top || 0 + 20,
              objectId: crypto.randomUUID(),
              fill: "#aabbcc",
            } as CustomFabricObject);

            canvas.add(enlivenedObj as CustomFabricObject);
            syncShapeInStorage(enlivenedObj as CustomFabricObject);
          });
          canvas.renderAll();
        });
      });
    } catch (error) {
      console.error("Error parsing clipboard data:", error);
    }
  }
}

export default handlePaste;
