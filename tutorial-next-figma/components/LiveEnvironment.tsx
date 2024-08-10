"use client";

import cursorMode from "@/constants/enums/cursorMode.enum";
import keyboardEventKey from "@/constants/enums/keyboardEventKey.enum";
import Reaction from "@/constants/enums/reaction.enum";
import useInterval from "@/hooks/useInterval";
import CursorState from "@/types/cursorState";
import ReactionEvent from "@/types/reactionEvent";
import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
  useOthers,
} from "@liveblocks/react/suspense";
import { useCallback, useEffect, useState } from "react";
import CursorChat from "./cursor/CursorChat";
import LiveCursors from "./cursor/LiveCursors";
import FlyingReaction from "./reaction/FlyingReaction";
import ReactionSelector from "./reaction/ReactionSelector";

function LiveEnvironment() {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();

  const [cursorState, setCursorState] = useState<CursorState>({
    mode: cursorMode.HIDDEN,
  });
  const [reactionEvents, setReactionEvents] = useState<ReactionEvent[]>([]);

  const broadcast = useBroadcastEvent();

  useInterval(() => {
    if (!cursor) return;
    if (cursorState.mode !== cursorMode.REACTION) return;
    if (!cursorState.isPressed) return;

    const newReactionEvent = {
      point: { x: cursor.x, y: cursor.y },
      reaction: cursorState.reaction,
      timestamp: Date.now(),
    };

    setReactionEvents((reactionEvents) =>
      reactionEvents.concat(newReactionEvent),
    );

    broadcast(newReactionEvent);
  }, 100);

  useInterval(() => {
    setReactionEvents((reactionEvents) =>
      reactionEvents.filter(
        (reactionEvent) => reactionEvent.timestamp > Date.now() - 4000,
      ),
    );
  }, 1000);

  useEventListener(({ event }) => {
    setReactionEvents((reactionEvents) =>
      reactionEvents.concat(event as ReactionEvent),
    );
  });

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();

      if (cursor && cursorState.mode === cursorMode.REACTION_SELECTOR) return;

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
    [updateMyPresence, cursor, cursorState],
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

      setCursorState((state) =>
        cursorState.mode ? { ...state, isPressed: true } : state,
      );
    },
    [updateMyPresence, cursorState],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent) => {
      setCursorState((state) =>
        cursorState.mode ? { ...state, isPressed: false } : state,
      );
    },
    [cursorState],
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
        case keyboardEventKey.E:
          setCursorState({
            mode: cursorMode.REACTION_SELECTOR,
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
  }, [updateMyPresence, cursorState]);

  const setReactions = useCallback((reaction: Reaction) => {
    setCursorState({
      mode: cursorMode.REACTION,
      reaction: reaction,
      isPressed: false,
    });
  }, []);

  return (
    <div
      className="flex h-screen w-screen items-center justify-center text-center"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
    >
      <h1 className="text-2xl text-white">Liveblocks Figma Clone</h1>

      {reactionEvents.map(({ reaction, timestamp, point }) => (
        <FlyingReaction
          key={timestamp.toString()}
          x={point.x}
          y={point.y}
          timestamp={timestamp}
          reaction={reaction}
        />
      ))}
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}

      {cursorState.mode === cursorMode.REACTION_SELECTOR && (
        <ReactionSelector setReaction={setReactions} />
      )}
      <LiveCursors others={others} />
    </div>
  );
}

export default LiveEnvironment;
