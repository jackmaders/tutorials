import { Canvas } from "fabric";

// resize canvas dimensions on window resize
function handleResize(canvas: Canvas) {
  const canvasElement = document.getElementById("canvas");
  if (!canvasElement) return;

  canvas.setDimensions({
    width: canvasElement.clientWidth,
    height: canvasElement.clientHeight,
  });
}

export default handleResize;
