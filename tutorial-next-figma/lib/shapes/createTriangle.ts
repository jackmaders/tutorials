import { Triangle } from "fabric";

function createTriangle(pointer: PointerEvent) {
  return new Triangle({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: "#aabbcc",
    objectId: crypto.randomUUID(),
  });
}

export default createTriangle;
