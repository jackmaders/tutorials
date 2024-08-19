import Attributes from "@/types/attributes";
import { ModifiedEvent } from "fabric";

export type CanvasObjectScaling = {};

// update element attributes when element is scaled
function handleCanvasObjectScaling(
  options: ModifiedEvent,
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>,
) {
  const selectedElement = options.target;

  // calculate scaled dimensions of the object
  const scaledWidth = selectedElement?.scaleX
    ? selectedElement?.width! * selectedElement?.scaleX
    : selectedElement?.width;

  const scaledHeight = selectedElement?.scaleY
    ? selectedElement?.height! * selectedElement?.scaleY
    : selectedElement?.height;

  setElementAttributes((prev) => ({
    ...prev,
    width: scaledWidth?.toFixed(0).toString() || "",
    height: scaledHeight?.toFixed(0).toString() || "",
  }));
}

export default handleCanvasObjectScaling;
