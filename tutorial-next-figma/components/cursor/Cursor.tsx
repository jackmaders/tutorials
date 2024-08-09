import COLOURS from "@/constants/colour.enum";
import CursorSVG from "./CursorSVG";

interface CursorProps {
  colour: COLOURS;
  x: number;
  y: number;
  message: string;
}

function Cursor({ colour, x, y, message }: CursorProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
    >
      <CursorSVG colour={colour} />

      {message && (
        <div
          className="absolute left-2 top-5 rounded-2xl px-4 py-2"
          style={{ backgroundColor: colour }}
        >
          <p className="whitespace-nowrap text-sm leading-relaxed text-white">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

export default Cursor;
