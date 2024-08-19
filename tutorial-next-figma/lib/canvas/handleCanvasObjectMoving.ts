import { ModifiedEvent } from "fabric";

// check how object is moving on canvas and restrict it to canvas boundaries
function handleCanvasObjectMoving(options: ModifiedEvent) {
  // get target object which is moving
  const target = options.target;

  // target.canvas is the canvas on which the object is moving
  const canvas = target.canvas;

  if (!canvas) return;

  // set coordinates of target object
  target.setCoords();

  // restrict object to canvas boundaries (horizontal)
  if (target && target.left) {
    target.left = Math.max(
      0,
      Math.min(
        target.left,
        (canvas.width || 0) - (target.getScaledWidth() || target.width || 0),
      ),
    );
  }

  // restrict object to canvas boundaries (vertical)
  if (target && target.top) {
    target.top = Math.max(
      0,
      Math.min(
        target.top,
        (canvas.height || 0) - (target.getScaledHeight() || target.height || 0),
      ),
    );
  }
}
