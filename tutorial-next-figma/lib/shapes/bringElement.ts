import CustomFabricObject from "@/types/customFabricObject";
import { Canvas } from "fabric";

function bringElement(
  canvas: Canvas,
  direction: string,
  syncShapeInStorage: (shape: CustomFabricObject) => void,
) {
  if (!canvas) return;

  // get the selected element. If there is no selected element or there are more than one selected element, return
  const selectedElement = canvas.getActiveObject();

  if (!selectedElement || selectedElement?.type === "activeSelection") return;

  // bring the selected element to the front
  if (direction === "front") {
    canvas.bringObjectToFront(selectedElement);
  } else if (direction === "back") {
    canvas.sendObjectToBack(selectedElement);
  }

  // canvas.renderAll();
  syncShapeInStorage(selectedElement);

  // re-render all objects on the canvas
}

export default bringElement;
