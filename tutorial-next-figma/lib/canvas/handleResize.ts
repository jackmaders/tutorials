import { Canvas } from "fabric";

interface handleResizeProps {
  canvas?: Canvas;
}

// resize canvas dimensions on window resize
function handleResize({ canvas }: handleResizeProps) {
  const canvasElement = document.getElementById("canvas");
  if (!canvasElement) return;

  if (!canvas) return;

  canvas.setDimensions({
    width: canvasElement.clientWidth,
    height: canvasElement.clientHeight,
  });
}

export default handleResize;
