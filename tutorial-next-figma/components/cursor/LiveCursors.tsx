import Colour from "@/constants/enums/colour.enum";
import { BaseUserMeta, User } from "@liveblocks/client";
import Cursor from "./Cursor";

interface LiveCursorsProps {
  others: readonly User<Liveblocks["Presence"], BaseUserMeta>[];
}

function LiveCursors({ others }: LiveCursorsProps) {
  return others.map(({ connectionId, presence }) => {
    if (!presence?.cursor) return;

    return (
      <Cursor
        key={connectionId}
        colour={getRandomColour(connectionId)}
        x={presence.cursor.x}
        y={presence.cursor.y}
        message={presence.message ?? ""}
      />
    );
  });
}

function getRandomColour(connectionId: number) {
  const colourValues = Object.values(Colour);
  const colourIndex = Number(connectionId) % colourValues.length;

  return colourValues[colourIndex];
}

export default LiveCursors;
