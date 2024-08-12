import NavbarItem from "@/types/navbarItem";
import NavbarValue from "./enums/navbarValue.enum";

import FabricObjectType from "./enums/canvasObjectType.enum";

const navbarItems: NavbarItem[] = [
  {
    icon: "/assets/select.svg",
    name: "Select",
    value: NavbarValue.SELECT,
  },
  {
    icon: "/assets/rectangle.svg",
    name: "Shapes",
    value: [
      {
        icon: "/assets/rectangle.svg",
        name: "Rectangle",
        value: FabricObjectType.RECTANGLE,
      },
      {
        icon: "/assets/circle.svg",
        name: "Circle",
        value: FabricObjectType.CIRCLE,
      },
      {
        icon: "/assets/triangle.svg",
        name: "Triangle",
        value: FabricObjectType.TRIANGLE,
      },
      {
        icon: "/assets/line.svg",
        name: "Line",
        value: FabricObjectType.LINE,
      },
      {
        icon: "/assets/image.svg",
        name: "Image",
        value: FabricObjectType.IMAGE,
      },
      {
        icon: "/assets/freeform.svg",
        name: "Free Drawing",
        value: FabricObjectType.FREEFORM,
      },
    ],
  },
  {
    icon: "/assets/text.svg",
    name: "Text",
    value: NavbarValue.TEXT,
  },
  {
    icon: "/assets/delete.svg",
    name: "Delete",
    value: NavbarValue.DELETE,
  },
  {
    icon: "/assets/reset.svg",
    name: "Reset",
    value: NavbarValue.RESET,
  },
  {
    icon: "/assets/comments.svg",
    name: "Comments",
    value: NavbarValue.COMMENTS,
  },
];

export default navbarItems;
