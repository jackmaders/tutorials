"use client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import LiveCursors from "./cursor/LiveCursors";
import { useCallback } from "react";

function LiveEnvironment() {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();

      const { clientX, clientY } = event;
      const { x: rectX, y: rectY } =
        event.currentTarget.getBoundingClientRect();

      const presence = {
        cursor: {
          x: clientX - rectX,
          y: clientY - rectY,
        },
      };

      updateMyPresence(presence);
    },
    [updateMyPresence],
  );

  const handlePointerLeave = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();

      const presence = {
        cursor: undefined,
      };

      updateMyPresence(presence);
    },
    [updateMyPresence],
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      const { clientX, clientY } = event;
      const { x: rectX, y: rectY } =
        event.currentTarget.getBoundingClientRect();

      const presence = {
        cursor: {
          x: clientX - rectX,
          y: clientY - rectY,
        },
      };

      updateMyPresence(presence);
    },
    [updateMyPresence],
  );

  return (
    <div
      className="flex h-screen w-screen items-center justify-center text-center"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
    >
      <h1 className="text-2xl text-white">Liveblocks Figma Clone</h1>
      <LiveCursors others={others} />
    </div>
  );
}

export default LiveEnvironment;
