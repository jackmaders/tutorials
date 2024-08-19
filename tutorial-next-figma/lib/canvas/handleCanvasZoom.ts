import { Canvas, ModifiedEvent, Point } from "fabric";

// zoom canvas on mouse scroll
function handleCanvasZoom(
  options: ModifiedEvent & { e: WheelEvent },
  canvas: Canvas,
) {
  const delta = options.e?.deltaY;
  let zoom = canvas.getZoom();

  // allow zooming to min 20% and max 100%
  const minZoom = 0.2;
  const maxZoom = 1;
  const zoomStep = 0.001;

  // calculate zoom based on mouse scroll wheel with min and max zoom
  zoom = Math.min(Math.max(minZoom, zoom + delta * zoomStep), maxZoom);

  // set zoom to canvas
  // zoomToPoint: http://fabricjs.com/docs/fabric.Canvas.html#zoomToPoint
  canvas.zoomToPoint(new Point(options.e.offsetX, options.e.offsetY), zoom);

  options.e.preventDefault();
  options.e.stopPropagation();
}

export default handleCanvasZoom;
