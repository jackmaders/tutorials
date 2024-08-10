import { Circle } from "fabric";

function createCircle(pointer: PointerEvent) {
  return new Circle({
    left: pointer.x,
    top: pointer.y,
    radius: 100,
    fill: "#aabbcc",
    objectId: crypto.randomUUID(),
  } as any);
}

export default createCircle;
