import { Circle, Point } from "fabric";

type CustomFabricCircle = Circle & { objectId: string };

function createCircle(pointer: Point) {
  return new Circle({
    left: pointer.x,
    top: pointer.y,
    radius: 100,
    fill: "#aabbcc",
    objectId: crypto.randomUUID(),
  }) as CustomFabricCircle;
}

export default createCircle;
