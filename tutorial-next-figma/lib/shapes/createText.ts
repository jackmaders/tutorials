import { IText, Point } from "fabric";

type CustomFabricText = IText & { objectId: string };

function createText(pointer: Point, text: string) {
  return new IText(text, {
    left: pointer.x,
    top: pointer.y,
    fill: "#aabbcc",
    fontFamily: "Helvetica",
    fontSize: 36,
    fontWeight: "400",
    objectId: crypto.randomUUID(),
  }) as CustomFabricText;
}

export default createText;
