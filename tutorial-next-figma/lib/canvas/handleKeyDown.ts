import CustomFabricObject from "@/types/customFabricObject";
import { Canvas } from "fabric";
import handlePaste from "./handlePaste";
import handleDelete from "./handleDelete";
import handleCopy from "./handleCopy";
import keyboardEventKey from "@/constants/enums/keyboardEventKey.enum";

// create a handleKeyDown function that listen to different keydown events
function handleKeyDown(
  event: KeyboardEvent,
  canvas: Canvas,
  undo: () => void,
  redo: () => void,
  syncShapeInStorage: (shape: CustomFabricObject) => void,
  deleteShapeFromStorage: (id: string) => void,
) {
  console.log(event.key);

  // Check if the key pressed is ctrl/cmd + c (copy)
  if ((event?.ctrlKey || event?.metaKey) && event.key === keyboardEventKey.c) {
    handleCopy(canvas);
  }

  // Check if the key pressed is ctrl/cmd + v (paste)
  if ((event?.ctrlKey || event?.metaKey) && event.key === keyboardEventKey.v) {
    handlePaste(canvas, syncShapeInStorage);
  }

  // Check if the key pressed is delete/backspace (delete)
  if (event.key === keyboardEventKey.Delete) {
    handleDelete(canvas, deleteShapeFromStorage);
  }

  // check if the key pressed is ctrl/cmd + x (cut)
  if ((event?.ctrlKey || event?.metaKey) && event.key === keyboardEventKey.x) {
    handleCopy(canvas);
    handleDelete(canvas, deleteShapeFromStorage);
  }

  // check if the key pressed is ctrl/cmd + z (undo)
  if ((event?.ctrlKey || event?.metaKey) && event.key === keyboardEventKey.z) {
    undo();
  }

  // check if the key pressed is ctrl/cmd + y (redo)
  if ((event?.ctrlKey || event?.metaKey) && event.key === keyboardEventKey.y) {
    redo();
  }

  if (event.key === keyboardEventKey.Slash && !event.shiftKey) {
    event.preventDefault();
  }
}

export default handleKeyDown;
