"use client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import LiveCursors from "./cursor/LiveCursors";
import { useCallback, useEffect, useState } from "react";
import CursorChat from "./cursor/CursorChat";
import cursorMode from "@/constants/cursorMode.enum";
import CursorState from "@/types/cursorState";
import keyboardEventKey from "@/constants/keyboardEventKey.enum";

function LiveEnvironment() {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();

  const [cursorState, setCursorState] = useState<CursorState>({
    mode: cursorMode.HIDDEN,
  });

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
      setCursorState({ mode: cursorMode.HIDDEN });

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

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case keyboardEventKey.FORWARD_SLASH:
          setCursorState({
            mode: cursorMode.CHAT,
            previousMessage: null,
            message: "",
          });
          break;
        case keyboardEventKey.ESCAPE:
          updateMyPresence({ message: "" });
          setCursorState({
            mode: cursorMode.HIDDEN,
          });
          break;
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case keyboardEventKey.FORWARD_SLASH:
          event.preventDefault();
          break;
      }
    };

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);

  return (
    <div
      className="flex h-screen w-screen items-center justify-center text-center"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
    >
      <h1 className="text-2xl text-white">Liveblocks Figma Clone</h1>
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      <LiveCursors others={others} />
    </div>
  );
}

export default LiveEnvironment;
