import fabric from "fabric";

export type ShapeData = {
  type: string;
  width: number;
  height: number;
  fill: string | fabric.Pattern | fabric.Gradient<"linear">;
  left: number;
  top: number;
  objectId: string | undefined;
};

export type Attributes = {
  width: string;
  height: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fill: string;
  stroke: string;
};

export interface CustomFabricObject<T extends fabric.Object>
  extends fabric.Object {
  objectId?: string;
}

export type ModifyShape = {
  canvas: fabric.Canvas;
  property: string;
  value: any;
  activeObjectRef: React.MutableRefObject<fabric.Object | null>;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type ElementDirection = {
  canvas: fabric.Canvas;
  direction: string;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type ImageUpload = {
  file: File;
  canvas: React.MutableRefObject<fabric.Canvas>;
  shapeRef: React.MutableRefObject<fabric.Object | null>;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type RightSidebarProps = {
  elementAttributes: Attributes;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
  fabricRef: React.RefObject<fabric.Canvas | null>;
  activeObjectRef: React.RefObject<fabric.Object | null>;
  isEditingRef: React.MutableRefObject<boolean>;
  syncShapeInStorage: (obj: any) => void;
};

export type CanvasMouseDown = {
  options: fabric.TEvent;
  canvas: fabric.Canvas;
  selectedShapeRef: any;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: React.MutableRefObject<fabric.Object | null>;
};

// export type CanvasMouseMove = {
//   options: fabric.TEvent;
//   canvas: fabric.Canvas;
//   isDrawing: React.MutableRefObject<boolean>;
//   selectedShapeRef: any;
//   shapeRef: any;
//   syncShapeInStorage: (shape: fabric.Object) => void;
// };

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

export type CanvasPathCreated = {
  options:
    | (fabric.ModifiedEvent & { path: CustomFabricObject<fabric.Path> })
    | any;
  syncShapeInStorage: (shape: fabric.Object) => void;
};

export type CanvasSelectionCreated = {
  options: fabric.CanvasEvents["selection:created"];
  isEditingRef: React.MutableRefObject<boolean>;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
};

export type CanvasObjectScaling = {
  options: fabric.ModifiedEvent;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
};

export type RenderCanvas = {
  fabricRef: React.MutableRefObject<fabric.Canvas | undefined>;
  canvasObjects: any;
  activeObjectRef: any;
};
