"use client";

import LeftSidebar from "@/components/LeftSidebar";
import LiveEnvironment from "@/components/LiveEnvironment";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import FabricObjectType from "@/constants/enums/canvasObjectType.enum";
import NavbarValue from "@/constants/enums/navbarValue.enum";
import navbarItems from "@/constants/navbarItems";

import handleCanvasMouseDown from "@/lib/canvas/handleCanvasMouseDown";
import handleCanvasMouseMove from "@/lib/canvas/handleCanvasMouseMove";
import handleCanvasMouseUp from "@/lib/canvas/handleCanvasMouseUp";
import handleCanvasObjectModified from "@/lib/canvas/handleCanvasObjectModified";
import handleDelete from "@/lib/canvas/handleDelete";
import handleKeyDown from "@/lib/canvas/handleKeyDown";
import handleResize from "@/lib/canvas/handleResize";

import initializeFabric from "@/lib/canvas/initialiseFabric";
import renderCanvas from "@/lib/canvas/renderCanvas";
import handleImageUpload from "@/lib/shapes/handleImageUpload";

import parseShape from "@/lib/shapes/parseShape";
import CustomFabricObject from "@/types/customFabricObject";
import NavbarItem from "@/types/navbarItem";
import {
  useMutation,
  useRedo,
  useStorage,
  useUndo,
} from "@liveblocks/react/suspense";
import { Canvas } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Page() {
  const undo = useUndo();
  const redo = useRedo();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | undefined>();
  const isDrawing = useRef(false);
  const shapeRef = useRef<CustomFabricObject | null>(null);
  const selectedShapeRef = useRef<FabricObjectType | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const activeObjectRef = useRef<CustomFabricObject>(null);

  const [activeNavbarItem, setActiveNavbarItem] = useState<NavbarItem>(
    navbarItems[0],
  );

  const canvasObjects = useStorage((root) => root.canvasObjects);

  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return;

    const { objectId } = object;

    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    const canvasObjects = storage.get("canvasObjects");

    canvasObjects.set(objectId, shapeData);
  }, []);

  const deleteAllShapesFromStorage = useMutation(({ storage }) => {
    const canvasObjects = storage.get("canvasObjects");

    if (!canvasObjects || canvasObjects.size === 0) return;

    Array.from(canvasObjects).map(([key]) => {
      canvasObjects.delete(key);
    });
  }, []);

  const deleteShapeFromStorage = useMutation(({ storage }, objectId) => {
    const canvasObjects = storage.get("canvasObjects");

    canvasObjects.delete(objectId);
  }, []);

  const handleActiveNavbarItem = useCallback(
    (navbarItem: NavbarItem) => {
      setActiveNavbarItem(navbarItem);

      switch (navbarItem.value) {
        case NavbarValue.RESET:
          deleteAllShapesFromStorage();
          fabricRef.current?.clear();
          setActiveNavbarItem(navbarItems[0]);
          break;
        case NavbarValue.DELETE:
          handleDelete(fabricRef.current, deleteShapeFromStorage);
          setActiveNavbarItem(navbarItems[0]);
          break;
        case FabricObjectType.IMAGE:
          imageInputRef.current?.click();
          isDrawing.current = false;
          if (fabricRef.current) fabricRef.current.isDrawingMode = false;
          break;
      }

      if (!Array.isArray(navbarItem.value)) {
        selectedShapeRef.current = parseShape(navbarItem.value) ?? null;
      }
    },
    [deleteAllShapesFromStorage, deleteShapeFromStorage],
  );

  useEffect(() => {
    renderCanvas({
      fabricRef,
      canvasObjects,
      activeObjectRef,
    });
  }, [canvasObjects]);

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef });

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
        activeObjectRef,
      });
    });

    canvas.on("mouse:move", (options) => {
      handleCanvasMouseMove({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
        syncShapeInStorage,
      });
    });

    canvas.on("mouse:up", (options) => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        shapeRef,
        activeObjectRef,
        selectedShapeRef,
        syncShapeInStorage,
        handleActiveNavbarItem,
      });
    });

    canvas.on("object:modified", (options) => {
      handleCanvasObjectModified({ options, syncShapeInStorage });
    });

    const handleResizeEvent = () => {
      handleResize({
        canvas: fabricRef.current,
      });
    };

    const handleKeydownEvent = (event: KeyboardEvent) => {
      handleKeyDown({
        event,
        canvas,
        undo,
        redo,
        syncShapeInStorage,
        deleteShapeFromStorage,
      });
    };

    window.addEventListener("resize", handleResizeEvent);
    window.addEventListener("keydown", handleKeydownEvent);

    return () => {
      canvas.dispose();

      window.removeEventListener("resize", handleResizeEvent);
      window.removeEventListener("keydown", handleKeydownEvent);
    };
  }, [
    syncShapeInStorage,
    handleActiveNavbarItem,
    deleteAllShapesFromStorage,
    deleteShapeFromStorage,
    undo,
    redo,
  ]);

  return (
    <main className="h-screen overflow-hidden">
      <Navbar
        activeNavbarItem={activeNavbarItem}
        handleActiveNavbarItem={handleActiveNavbarItem}
        handleImageUpload={(event) => {
          event.stopPropagation();
          if (!event.target.files) return;

          handleImageUpload({
            file: event.target.files[0],
            canvas: fabricRef,
            shapeRef,
            syncShapeInStorage,
          });
        }}
        imageInputRef={imageInputRef}
      />
      <section className="flex h-full flex-row">
        <LeftSidebar allShapes={Array.from(canvasObjects)} />
        <LiveEnvironment canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  );
}
