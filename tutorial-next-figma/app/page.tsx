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
import handleResize from "@/lib/canvas/handleResize";

import initializeFabric from "@/lib/canvas/initialiseFabric";
import renderCanvas from "@/lib/canvas/renderCanvas";

import parseShape from "@/lib/shapes/parseShape";
import CustomFabricObject from "@/types/customFabricObject";
import NavbarItem from "@/types/navbarItem";
import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { Canvas } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Page() {
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

    for (const [key] of canvasObjects.entries()) {
      canvasObjects.delete(key);
    }
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

    window.addEventListener("resize", handleResizeEvent);

    return () => {
      canvas.dispose();
      window.removeEventListener("resize", handleResizeEvent);
    };
  }, [syncShapeInStorage, handleActiveNavbarItem]);

  return (
    <main className="h-screen overflow-hidden">
      <Navbar
        activeNavbarItem={activeNavbarItem}
        handleActiveNavbarItem={handleActiveNavbarItem}
        handleImageUpload={() => {}}
        imageInputRef={imageInputRef}
      />
      <section className="flex h-full flex-row">
        <LeftSidebar allShapes={[]} />
        <LiveEnvironment canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  );
}
