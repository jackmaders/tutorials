"use client";

import LeftSidebar from "@/components/LeftSidebar";
import LiveEnvironment from "@/components/LiveEnvironment";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import FabricObjectType from "@/constants/enums/canvasObjectType.enum";
import navbarItems from "@/constants/navbarItems";
import handleCanvasMouseDown from "@/lib/canvas/handleCanvasMouseDown";
import handleResize from "@/lib/canvas/handleResize";

import initializeFabric from "@/lib/canvas/initialiseFabric";
import parseShape from "@/lib/shapes/parseShape";
import NavbarItem from "@/types/navbarItem";
import { Canvas, FabricObject } from "fabric";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas>();
  const isDrawing = useRef(false);
  const shapeRef = useRef<FabricObject>(null);
  const selectedShapeRef = useRef<FabricObjectType>(FabricObjectType.RECTANGLE);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [activeNavbarItem, setActiveNavbarItem] = useState<NavbarItem>(
    navbarItems[0],
  );

  function handleActiveNavbarItem(navbarItem: NavbarItem) {
    setActiveNavbarItem(navbarItem);

    if (!Array.isArray(navbarItem.value)) {
      selectedShapeRef.current =
        parseShape(navbarItem.value) ?? FabricObjectType.RECTANGLE;
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

    window.addEventListener("resize", () => {
      handleResize({
        canvas: fabricRef.current,
      });
    });

    return () => {
      canvas.dispose();
    };
  }, []);

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
