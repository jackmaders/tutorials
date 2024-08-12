"use client";

import LeftSidebar from "@/components/LeftSidebar";
import LiveEnvironment from "@/components/LiveEnvironment";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import FabricObjectType from "@/constants/enums/canvasObjectType.enum";
import navbarItems from "@/constants/navbarItems";
import handleCanvasMouseDown from "@/lib/canvas/handleCanvasMouseDown";
import handleCanvasMouseMove from "@/lib/canvas/handleCanvasMouseMove";
import handleCanvasMouseUp from "@/lib/canvas/handleCanvasMouseUp";
import handleResize from "@/lib/canvas/handleResize";

import initializeFabric from "@/lib/canvas/initialiseFabric";
import parseShape from "@/lib/shapes/parseShape";
import NavbarItem from "@/types/navbarItem";
import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { Canvas, FabricObject } from "fabric";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas>();
  const isDrawing = useRef(false);
  const shapeRef = useRef<FabricObject | null>(null);
  const selectedShapeRef = useRef<FabricObjectType | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const activeObjectRef = useRef<FabricObject>(null);

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

  function handleActiveNavbarItem(navbarItem: NavbarItem) {
    setActiveNavbarItem(navbarItem);

    if (!Array.isArray(navbarItem.value)) {
      selectedShapeRef.current = parseShape(navbarItem.value) ?? null;
    }
  }

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef });

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
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

    window.addEventListener("resize", () => {
      handleResize({
        canvas: fabricRef.current,
      });
    });

    return () => {
      canvas.dispose();
    };
  }, [syncShapeInStorage]);

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
