import { Rect } from "fabric";

function createRectangle(pointer: PointerEvent) {
  return new Rect({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: "#aabbcc",
    objectId: crypto.randomUUID(),
  });
}

export default createRectangle;
