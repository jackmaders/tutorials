import cursorMode from "@/constants/cursorMode.enum";
import Reaction from "@/constants/reaction.enum";

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
      reaction: Reaction;
      isPressed: boolean;
    };

export default CursorState;
