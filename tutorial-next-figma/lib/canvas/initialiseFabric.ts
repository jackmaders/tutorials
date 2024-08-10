import { Canvas } from "fabric";

interface initializeFabricProps {
  fabricRef: React.MutableRefObject<Canvas | undefined>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}
// initialize fabric canvas
function initializeFabric({ fabricRef, canvasRef }: initializeFabricProps) {
  // get canvas element
  const canvasElement = document.getElementById("canvas");

  // create fabric canvas
  const canvas = new Canvas(canvasRef.current ?? undefined, {
    width: canvasElement?.clientWidth,
    height: canvasElement?.clientHeight,
  });

  // set canvas reference to fabricRef so we can use it later anywhere outside canvas listener
  fabricRef.current = canvas;

  return canvas;
}

export default initializeFabric;
