import fabric from "fabric";
import { v4 as uuid4 } from "uuid";

import {
  CanvasMouseDown,
  CanvasMouseUp,
  CanvasObjectModified,
  CanvasObjectScaling,
  CanvasPathCreated,
  CanvasSelectionCreated,
  RenderCanvas,
} from "@/types/type";

// instantiate creation of custom fabric object/shape and add it to canvas

// // handle mouse move event on canvas to draw shapes with different dimensions
// export const handleCanvasMouseMove = ({
//   options,
//   canvas,
//   isDrawing,
//   selectedShapeRef,
//   shapeRef,
//   syncShapeInStorage,
// }: CanvasMouseMove) => {
//   // if selected shape is freeform, return
//   if (!isDrawing.current) return;
//   if (selectedShapeRef.current === "freeform") return;

//   canvas.isDrawingMode = false;

//   // get pointer coordinates
//   const pointer = canvas.getPointer(options.e);

//   // depending on the selected shape, set the dimensions of the shape stored in shapeRef in previous step of handelCanvasMouseDown
//   // calculate shape dimensions based on pointer coordinates
//   switch (selectedShapeRef?.current) {
//     case "rectangle":
//       shapeRef.current?.set({
//         width: pointer.x - (shapeRef.current?.left || 0),
//         height: pointer.y - (shapeRef.current?.top || 0),
//       });
//       break;

//     case "circle":
//       shapeRef.current.set({
//         radius: Math.abs(pointer.x - (shapeRef.current?.left || 0)) / 2,
//       });
//       break;

//     case "triangle":
//       shapeRef.current?.set({
//         width: pointer.x - (shapeRef.current?.left || 0),
//         height: pointer.y - (shapeRef.current?.top || 0),
//       });
//       break;

//     case "line":
//       shapeRef.current?.set({
//         x2: pointer.x,
//         y2: pointer.y,
//       });
//       break;

//     case "image":
//       shapeRef.current?.set({
//         width: pointer.x - (shapeRef.current?.left || 0),
//         height: pointer.y - (shapeRef.current?.top || 0),
//       });

//     default:
//       break;
//   }

//   // render objects on canvas
//   // renderAll: http://fabricjs.com/docs/fabric.Canvas.html#renderAll
//   canvas.renderAll();

//   // sync shape in storage
//   if (shapeRef.current?.objectId) {
//     syncShapeInStorage(shapeRef.current);
//   }
// };

// // handle mouse up event on canvas to stop drawing shapes
// export const handleCanvasMouseUp = ({
//   canvas,
//   isDrawing,
//   shapeRef,
//   activeObjectRef,
//   selectedShapeRef,
//   syncShapeInStorage,
//   setActiveElement,
// }: CanvasMouseUp) => {
//   isDrawing.current = false;
//   if (selectedShapeRef.current === "freeform") return;

//   // sync shape in storage as drawing is stopped
//   syncShapeInStorage(shapeRef.current);

//   // set everything to null
//   shapeRef.current = null;
//   activeObjectRef.current = null;
//   selectedShapeRef.current = null;

//   // if canvas is not in drawing mode, set active element to default nav element after 700ms
//   if (!canvas.isDrawingMode) {
//     setTimeout(() => {
//       setActiveElement(DEFAULT_NAV_ELEMENT);
//     }, 700);
//   }
// };

// update shape in storage when object is modified
export const handleCanvasObjectModified = ({
  options,
  syncShapeInStorage,
}: CanvasObjectModified) => {
  const target = options.target;
  if (!target) return;

  if (target?.type == "activeSelection") {
    // fix this
  } else {
    syncShapeInStorage(target);
  }
};

// update shape in storage when path is created when in freeform mode
export const handlePathCreated = ({
  options,
  syncShapeInStorage,
}: CanvasPathCreated) => {
  // get path object
  const path = options.path;
  if (!path) return;

  // set unique id to path object
  path.set({
    objectId: uuid4(),
  });

  // sync shape in storage
  syncShapeInStorage(path);
};

// check how object is moving on canvas and restrict it to canvas boundaries
export const handleCanvasObjectMoving = ({
  options,
}: {
  options: fabric.ModifiedEvent;
}) => {
  // get target object which is moving
  const target = options.target as fabric.FabricObject;

  // target.canvas is the canvas on which the object is moving
  const canvas = target.canvas as fabric.Canvas;

  // set coordinates of target object
  target.setCoords();

  // restrict object to canvas boundaries (horizontal)
  if (target && target.left) {
    target.left = Math.max(
      0,
      Math.min(
        target.left,
        (canvas.width || 0) - (target.getScaledWidth() || target.width || 0),
      ),
    );
  }

  // restrict object to canvas boundaries (vertical)
  if (target && target.top) {
    target.top = Math.max(
      0,
      Math.min(
        target.top,
        (canvas.height || 0) - (target.getScaledHeight() || target.height || 0),
      ),
    );
  }
};

// set element attributes when element is selected
export const handleCanvasSelectionCreated = ({
  options,
  isEditingRef,
  setElementAttributes,
}: CanvasSelectionCreated) => {
  // if user is editing manually, return
  if (isEditingRef.current) return;

  // if no element is selected, return
  if (!options?.selected) return;

  // get the selected element
  const selectedElement = options?.selected[0] as fabric.Object;

  // if only one element is selected, set element attributes
  if (selectedElement && options.selected.length === 1) {
    // calculate scaled dimensions of the object
    const scaledWidth = selectedElement?.scaleX
      ? selectedElement?.width! * selectedElement?.scaleX
      : selectedElement?.width;

    const scaledHeight = selectedElement?.scaleY
      ? selectedElement?.height! * selectedElement?.scaleY
      : selectedElement?.height;

    setElementAttributes({
      width: scaledWidth?.toFixed(0).toString() || "",
      height: scaledHeight?.toFixed(0).toString() || "",
      fill: selectedElement?.fill?.toString() || "",
      stroke: selectedElement?.stroke?.toString() || "",
      // @ts-ignore
      fontSize: selectedElement?.fontSize || "",
      // @ts-ignore
      fontFamily: selectedElement?.fontFamily || "",
      // @ts-ignore
      fontWeight: selectedElement?.fontWeight || "",
    });
  }
};

// update element attributes when element is scaled
export const handleCanvasObjectScaling = ({
  options,
  setElementAttributes,
}: CanvasObjectScaling) => {
  const selectedElement = options.target;

  // calculate scaled dimensions of the object
  const scaledWidth = selectedElement?.scaleX
    ? selectedElement?.width! * selectedElement?.scaleX
    : selectedElement?.width;

  const scaledHeight = selectedElement?.scaleY
    ? selectedElement?.height! * selectedElement?.scaleY
    : selectedElement?.height;

  setElementAttributes((prev) => ({
    ...prev,
    width: scaledWidth?.toFixed(0).toString() || "",
    height: scaledHeight?.toFixed(0).toString() || "",
  }));
};

// render canvas objects coming from storage on canvas
export const renderCanvas = ({
  fabricRef,
  canvasObjects,
  activeObjectRef,
}: RenderCanvas) => {
  // clear canvas
  fabricRef.current?.clear();

  // render all objects on canvas
  Array.from(canvasObjects, ([objectId, objectData]) => {
    /**
     * enlivenObjects() is used to render objects on canvas.
     * It takes two arguments:
     * 1. objectData: object data to render on canvas
     * 2. callback: callback function to execute after rendering objects
     * on canvas
     *
     * enlivenObjects: http://fabricjs.com/docs/fabric.util.html#.enlivenObjectEnlivables
     */
    fabric.util.enlivenObjects([objectData]).then((enlivenedObjects) => {
      enlivenedObjects.forEach((enlivenedObj) => {
        // if element is active, keep it in active state so that it can be edited further
        if (activeObjectRef.current?.objectId === objectId) {
          fabricRef.current?.setActiveObject(
            enlivenedObj as fabric.FabricObject,
          );
        }

        // add object to canvas
        fabricRef.current?.add(enlivenedObj as fabric.FabricObject);
      });
    });
  });

  fabricRef.current?.renderAll();
};

// zoom canvas on mouse scroll
export const handleCanvasZoom = ({
  options,
  canvas,
}: {
  options: fabric.ModifiedEvent & { e: WheelEvent };
  canvas: fabric.Canvas;
}) => {
  const delta = options.e?.deltaY;
  let zoom = canvas.getZoom();

  // allow zooming to min 20% and max 100%
  const minZoom = 0.2;
  const maxZoom = 1;
  const zoomStep = 0.001;

  // calculate zoom based on mouse scroll wheel with min and max zoom
  zoom = Math.min(Math.max(minZoom, zoom + delta * zoomStep), maxZoom);

  // set zoom to canvas
  // zoomToPoint: http://fabricjs.com/docs/fabric.Canvas.html#zoomToPoint
  canvas.zoomToPoint(
    new fabric.Point(options.e.offsetX, options.e.offsetY),
    zoom,
  );

  options.e.preventDefault();
  options.e.stopPropagation();
};
