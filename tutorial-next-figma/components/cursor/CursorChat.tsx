import Colour from "@/constants/colour.enum";
import cursorMode from "@/constants/cursorMode.enum";
import CursorSVG from "./CursorSVG";
import CursorState from "@/types/cursorState";
import keyboardEventKey from "@/constants/keyboardEventKey.enum";

export type CursorChatProps = {
  cursor: NonNullable<Liveblocks["Presence"]["cursor"]>;
  cursorState: CursorState;
  setCursorState: (cursorState: CursorState) => void;
  updateMyPresence: (presence: Liveblocks["Presence"]) => void;
};

function CursorChat({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}: CursorChatProps) {
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const message = event.target.value;

    updateMyPresence({ message });
    setCursorState({
      mode: cursorMode.CHAT,
      previousMessage: null,
      message,
    });
  }

  function handleKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case keyboardEventKey.ESCAPE:
        setCursorState({
          mode: cursorMode.HIDDEN,
        });
        break;
    }
  }

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (cursorState.mode !== cursorMode.CHAT) return;

    setCursorState({
      mode: cursorMode.CHAT,
      previousMessage: cursorState.message,
      message: "",
    });
  }

  return (
    <div
      className="absolute left-0 top-0"
      style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
      }}
    >
      {cursorState.mode === cursorMode.CHAT && (
        <>
          <CursorSVG colour={Colour.BLACK} />
          <form
            onSubmit={handleOnSubmit}
            className="absolute left-2 top-5 rounded-2xl bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white"
          >
            {cursorState.previousMessage && (
              <div className="text-start">{cursorState.previousMessage}</div>
            )}

            <input
              className="z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none"
              placeholder={
                cursorState.previousMessage ? "" : "Type a message..."
              }
              autoFocus
              value={cursorState.message}
              onChange={handleOnChange}
              onKeyDown={handleKeydown}
            />
            <input type="submit" hidden />
          </form>
        </>
      )}
    </div>
  );
}

export default CursorChat;
