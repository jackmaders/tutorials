import Attributes from "@/types/attributes";
import { CanvasEvents } from "fabric";
import { Dispatch, MutableRefObject } from "react";

// set element attributes when element is selected
function handleCanvasSelectionCreated(
  options: CanvasEvents["selection:created"],
  isEditingRef: MutableRefObject<boolean>,
  setElementAttributes: Dispatch<React.SetStateAction<Attributes>>,
) {
  // if user is editing manually, return
  if (isEditingRef.current) return;

  // if no element is selected, return
  if (!options?.selected) return;

  // get the selected element
  const selectedElement = options?.selected[0];

  // if only one element is selected, set element attributes
  if (selectedElement && options.selected.length === 1) {
    // calculate scaled dimensions of the object
    const scaledWidth = selectedElement?.scaleX
      ? selectedElement?.width! * selectedElement?.scaleX
      : selectedElement?.width;

    const scaledHeight = selectedElement?.scaleY
      ? selectedElement?.height! * selectedElement?.scaleY
      : selectedElement?.height;

    setElementAttributes({
      width: scaledWidth?.toFixed(0).toString() || "",
      height: scaledHeight?.toFixed(0).toString() || "",
      fill: selectedElement?.fill?.toString() || "",
      stroke: selectedElement?.stroke?.toString() || "",
      // @ts-ignore
      fontSize: selectedElement?.fontSize || "",
      // @ts-ignore
      fontFamily: selectedElement?.fontFamily || "",
      // @ts-ignore
      fontWeight: selectedElement?.fontWeight || "",
    });
  }
}

export default handleCanvasSelectionCreated;
