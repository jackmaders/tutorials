"use client";

import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import NavbarItem from "@/types/navbarItem";
import { cn } from "@/lib/utils";

interface ShapesMenuProps {
  item: NavbarItem;
  activeNavbarItem?: NavbarItem;
  handleActiveNavbarItem: (element: NavbarItem) => void;
  handleImageUpload: any;
  imageInputRef: any;
}

function ShapesMenu({
  item,
  activeNavbarItem,
  handleActiveNavbarItem,
  handleImageUpload,
  imageInputRef,
}: ShapesMenuProps) {
  if (!Array.isArray(item.value)) return;

  const shapeSelected = item.value.some(
    (shape) => shape?.value === activeNavbarItem?.value,
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="no-ring">
          <Button
            className={cn(
              "aspect-square h-full",
              shapeSelected ? "bg-primary-green" : "hover:bg-primary-grey-200",
            )}
            onClick={() => handleActiveNavbarItem(item)}
          >
            <Image
              src={
                shapeSelected && activeNavbarItem
                  ? activeNavbarItem.icon
                  : item.icon
              }
              alt={item.name}
              width={20}
              height={20}
              className={cn(
                "size-5 object-contain",
                shapeSelected ? "invert" : "",
              )}
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mt-5 flex flex-col gap-y-1 border-none bg-primary-black py-4 text-white">
          {item.value.map((elem) => (
            <Button
              key={elem?.name}
              onClick={() => {
                handleActiveNavbarItem(elem);
              }}
              className={`flex h-fit justify-between gap-10 rounded-none px-5 py-3 focus:border-none ${
                activeNavbarItem?.value === elem?.value
                  ? "bg-primary-green"
                  : "hover:bg-primary-grey-200"
              }`}
            >
              <div className="group flex items-center gap-2">
                <Image
                  src={elem?.icon as string}
                  alt={elem?.name as string}
                  width={20}
                  height={20}
                  className={cn(
                    "size-5 object-contain",
                    activeNavbarItem?.value === elem?.value ? "invert" : "",
                  )}
                />
                <p
                  className={`text-sm ${
                    activeNavbarItem?.value === elem?.value
                      ? "text-primary-black"
                      : "text-white"
                  }`}
                >
                  {elem?.name}
                </p>
              </div>
            </Button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        type="file"
        className="hidden"
        ref={imageInputRef}
        accept="image/*"
        onChange={handleImageUpload}
      />
    </>
  );
}

export default ShapesMenu;
