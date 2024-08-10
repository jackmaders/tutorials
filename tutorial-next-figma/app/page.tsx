"use client";

import LeftSidebar from "@/components/LeftSidebar";
import LiveEnvironment from "@/components/LiveEnvironment";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import ShapeType from "@/constants/enums/shapeType.enum";

import handleCanvasMouseDown from "@/lib/canvas/handleCanvasMouseDown";
import { handleResize } from "@/lib/canvas/handleResize";
import initializeFabric from "@/lib/canvas/initialiseFabric";
import { Canvas, FabricObject } from "fabric";
import { useEffect, useRef } from "react";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas>();
  const isDrawing = useRef(false);
  const shapeRef = useRef<FabricObject>(null);
  const selectedShapeRef = useRef<ShapeType>(ShapeType.RECTANGLE);

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
      handleResize({ canvas });
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <main className="h-screen overflow-hidden">
      <Navbar />
      <section className="flex h-full flex-row">
        <LeftSidebar />
        <LiveEnvironment canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  );
}
