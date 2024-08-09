import COLOURS from "@/constants/colour";
import CursorSVG from "@/public/assets/CursorSVG";

interface CursorProps {
  colour: COLOURS;
  x: number;
  y: number;
  message: string;
}

function Cursor({ colour, x, y }: CursorProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
    >
      <CursorSVG colour={colour} />
    </div>
  );
}

export default Cursor;
