import { IText } from "fabric";

function createText(pointer: PointerEvent, text: string) {
  return new IText(text, {
    left: pointer.x,
    top: pointer.y,
    fill: "#aabbcc",
    fontFamily: "Helvetica",
    fontSize: 36,
    fontWeight: "400",
    objectId: crypto.randomUUID(),
  });
}

export default createText;
