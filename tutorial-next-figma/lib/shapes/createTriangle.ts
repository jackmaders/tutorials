import { Point, Triangle } from "fabric";

type CustomFabricTriangle = Triangle & { objectId: string };

function createTriangle(pointer: Point) {
  return new Triangle({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: "#aabbcc",
    objectId: crypto.randomUUID(),
  }) as CustomFabricTriangle;
}

export default createTriangle;
