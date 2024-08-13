import Image from "next/image";
import ActiveUsers from "./users/ActiveUsers";
import NewThread from "./comments/NewThread";
import ShapesMenu from "./ShapesMenu";
import { Button } from "./ui/button";
import NavbarItem from "@/types/navbarItem";
import navbarItems from "@/constants/navbarItems";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeNavbarItem?: NavbarItem;
  handleActiveNavbarItem: (element: NavbarItem) => void;
  imageInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Navbar({
  activeNavbarItem,
  handleActiveNavbarItem,
  imageInputRef,
  handleImageUpload,
}: NavbarProps) {
  function isActive(navbarItem: string | Array<NavbarItem>) {
    const isActiveValue =
      activeNavbarItem && activeNavbarItem.value === navbarItem;
    const containsActiveValue =
      Array.isArray(navbarItem) &&
      navbarItem.some((val) => val?.value === activeNavbarItem?.value);

    return isActiveValue || containsActiveValue;
  }

  return (
    <nav className="flex h-14 select-none items-center justify-between gap-4 bg-primary-black px-5 text-white">
      <Image src="/assets/logo.svg" alt="FigPro Logo" width={58} height={20} />
      <ul className="flex h-full flex-row">
        {navbarItems.map((navbarItem) => (
          <li
            key={navbarItem.name}
            className={`flex size-14 items-center justify-center`}
          >
            {Array.isArray(navbarItem.value) ? (
              <ShapesMenu
                item={navbarItem}
                activeNavbarItem={activeNavbarItem}
                imageInputRef={imageInputRef}
                handleActiveNavbarItem={handleActiveNavbarItem}
                handleImageUpload={handleImageUpload}
              />
            ) : navbarItem.value === "comments" ? (
              <NewThread
                className={cn(
                  isActive(navbarItem.value)
                    ? "bg-primary-green"
                    : "hover:bg-primary-grey-200",
                  "aspect-square h-full",
                )}
                onClick={() => {
                  handleActiveNavbarItem(navbarItem);
                }}
              >
                <Image
                  src={navbarItem.icon}
                  alt={navbarItem.name}
                  width={20}
                  height={20}
                  className={cn(
                    "object-contain",
                    isActive(navbarItem.value) ? "invert" : "",
                  )}
                />
              </NewThread>
            ) : (
              <Button
                className={cn(
                  isActive(navbarItem.value)
                    ? "bg-primary-green"
                    : "hover:bg-primary-grey-200",
                  "aspect-square h-full",
                )}
                onClick={() => {
                  handleActiveNavbarItem(navbarItem);
                }}
              >
                <Image
                  src={navbarItem.icon}
                  alt={navbarItem.name}
                  width={20}
                  height={20}
                  className={cn(
                    "object-contain",
                    isActive(navbarItem.value) ? "invert" : "",
                  )}
                />
              </Button>
            )}
          </li>
        ))}
      </ul>
      <ActiveUsers />
    </nav>
  );
}

export default Navbar;
