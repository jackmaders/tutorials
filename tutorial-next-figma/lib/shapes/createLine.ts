import { Line } from "fabric";

function createLine(pointer: PointerEvent) {
  return new Line([pointer.x, pointer.y, pointer.x + 100, pointer.y + 100], {
    stroke: "#aabbcc",
    strokeWidth: 2,
    objectId: crypto.randomUUID(),
  });
}

export default createLine;
