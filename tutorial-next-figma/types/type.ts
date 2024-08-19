import fabric from "fabric";
import Attributes from "./attributes";

export type ShapeData = {
  type: string;
  width: number;
  height: number;
  fill: string | fabric.Pattern | fabric.Gradient<"linear">;
  left: number;
  top: number;
  objectId: string | undefined;
};

export type CanvasMouseUp = {
  canvas: fabric.Canvas;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: any;
  activeObjectRef: React.MutableRefObject<fabric.Object | null>;
  selectedShapeRef: any;
  syncShapeInStorage: (shape: fabric.Object) => void;
  setActiveElement: any;
};

export type CanvasObjectModified = {
  options: fabric.ModifiedEvent;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type RenderCanvas = {
  fabricRef: React.MutableRefObject<fabric.Canvas | undefined>;
  canvasObjects: any;
  activeObjectRef: any;
};
