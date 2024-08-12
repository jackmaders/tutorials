import NavbarValue from "@/constants/enums/navbarValue.enum";
import NavbarShapeItem from "./navbarShapeItem";

type NavbarItem = {
  icon: string;
  name: string;
  value: NavbarShapeItem[] | string;
};

export default NavbarItem;
