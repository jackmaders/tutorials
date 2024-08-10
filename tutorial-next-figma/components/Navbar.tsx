"use client";

import Image from "next/image";
import ActiveUsers from "./users/ActiveUsers";

export type ActiveElement = {
  name: string;
  value: string;
  icon: string;
} | null;

interface NavbarProps {
  activeElement: ActiveElement;
  imageInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleActiveElement: (element: ActiveElement) => void;
}

function Navbar() {
  return (
    <nav className="flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white">
      <Image src="/assets/logo.svg" alt="FigPro Logo" width={58} height={20} />
      <ActiveUsers />
    </nav>
  );
}

export default Navbar;
