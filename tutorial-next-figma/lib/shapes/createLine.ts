import { Line, Point } from "fabric";

type CustomFabricLine = Line & { objectId: string };

function createLine(pointer: Point) {
  return new Line([pointer.x, pointer.y, pointer.x + 100, pointer.y + 100], {
    stroke: "#aabbcc",
    strokeWidth: 2,
    objectId: crypto.randomUUID(),
  }) as CustomFabricLine;
}

export default createLine;
