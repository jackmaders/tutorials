import Attributes from "@/types/attributes";
import Color from "./settings/Color";
import Dimensions from "./settings/Dimensions";
import Export from "./settings/Export";
import Text from "./settings/Text";
import { Canvas } from "fabric";
import modifyShape from "@/lib/shapes/modifyShape";
import { useRef } from "react";
import CustomFabricObject from "@/types/customFabricObject";

interface RightSidebarProps {
  elementAttributes: Attributes;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
  fabricRef: React.RefObject<Canvas | undefined>;
  activeObjectRef: React.RefObject<CustomFabricObject | null>;
  isEditingRef: React.MutableRefObject<boolean>;
  syncShapeInStorage: (obj: any) => void;
}

function RightSidebar({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  activeObjectRef,
  isEditingRef,
  syncShapeInStorage,
}: RightSidebarProps) {
  function handleInputChange(property: string, value: string) {
    if (!isEditingRef.current) isEditingRef.current = true;

    setElementAttributes((prev) => ({ ...prev, [property]: value }));

    if (!fabricRef.current) return;
    modifyShape(
      fabricRef.current,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    );
  }
  const colorInputRef = useRef<HTMLInputElement>(null);
  const strokeInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="sticky right-0 flex h-full min-w-56 select-none flex-col overflow-y-auto border-t border-primary-grey-200 bg-primary-black pb-20 text-primary-grey-300 max-sm:hidden">
      <h3 className="px-5 pt-4 text-xs uppercase">Design</h3>

      <Dimensions
        width={elementAttributes.width}
        height={elementAttributes.height}
        isEditingRef={isEditingRef}
        handleInputChange={handleInputChange}
      />
      <Text
        fontFamily={elementAttributes.fontFamily}
        fontSize={elementAttributes.fontSize}
        fontWeight={elementAttributes.fontWeight}
        handleInputChange={handleInputChange}
      />
      <Color
        inputRef={colorInputRef}
        attribute={elementAttributes.fill}
        placeholder="Fill"
        attributeType="fill"
        handleInputChange={handleInputChange}
      />
      <Color
        inputRef={strokeInputRef}
        attribute={elementAttributes.stroke}
        placeholder="Stroke"
        attributeType="stroke"
        handleInputChange={handleInputChange}
      />
      <Export />
    </section>
  );
}

export default RightSidebar;
