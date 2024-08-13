import CustomFabricObject from "@/types/customFabricObject";
import { clear } from "console";
import { Canvas, FabricObject, util } from "fabric";

// render canvas objects coming from storage on canvas
function renderCanvas(
  fabricRef: React.MutableRefObject<Canvas | undefined>,
  canvasObjects: ReadonlyMap<any, any>,
  activeObjectRef: React.MutableRefObject<CustomFabricObject | null>,
) {
  // clear canvas
  if (fabricRef.current?.contextTop) fabricRef.current?.clear();

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
    util.enlivenObjects([objectData]).then((enlivenedObjects) => {
      enlivenedObjects.forEach((enlivenedObj) => {
        // if element is active, keep it in active state so that it can be edited further
        if (activeObjectRef.current?.objectId === objectId) {
          fabricRef.current?.setActiveObject(enlivenedObj as FabricObject);
        }

        // add object to canvas
        fabricRef.current?.add(enlivenedObj as FabricObject);
      });
    });
  });

  fabricRef.current?.renderAll();
}

export default renderCanvas;
