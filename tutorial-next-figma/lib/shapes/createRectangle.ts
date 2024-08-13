import { Point, Rect } from "fabric";

type CustomFabricRect = Rect & { objectId: string };

function createRectangle(pointer: Point) {
  return new Rect({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: "#aabbcc",
    objectId: crypto.randomUUID(),
  }) as CustomFabricRect;
}

export default createRectangle;
