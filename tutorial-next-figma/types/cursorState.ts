import cursorMode from "@/constants/cursorMode.enum";

type CursorState =
  | {
      mode: cursorMode.HIDDEN;
    }
  | {
      mode: cursorMode.CHAT;
      message: string;
      previousMessage: string | null;
    }
  | {
      mode: cursorMode.REACTION_SELECTOR;
    }
  | {
      mode: cursorMode.REACTION;
      reaction: string;
      isPressed: boolean;
    };

export default CursorState;
