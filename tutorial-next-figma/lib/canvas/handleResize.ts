import { Canvas } from "fabric";

// resize canvas dimensions on window resize
export const handleResize = ({ canvas }: { canvas: Canvas }) => {
  const canvasElement = document.getElementById("canvas");
  if (!canvasElement) return;

  if (!canvas) return;

  canvas.setDimensions({
    width: canvasElement.clientWidth,
    height: canvasElement.clientHeight,
  });
};
