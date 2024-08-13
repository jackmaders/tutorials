import FabricObjectType from "@/constants/enums/canvasObjectType.enum";

export const getShapeInfo = (shapeType: FabricObjectType) => {
  switch (shapeType.toLocaleLowerCase()) {
    case FabricObjectType.RECTANGLE:
    default:
      return {
        icon: "/assets/rectangle.svg",
        name: "Rectangle",
      };

    case FabricObjectType.CIRCLE:
      return {
        icon: "/assets/circle.svg",
        name: "Circle",
      };

    case FabricObjectType.TRIANGLE:
      return {
        icon: "/assets/triangle.svg",
        name: "Triangle",
      };

    case FabricObjectType.LINE:
      return {
        icon: "/assets/line.svg",
        name: "Line",
      };

    case FabricObjectType.TEXT:
      return {
        icon: "/assets/text.svg",
        name: "Text",
      };

    case FabricObjectType.IMAGE:
      return {
        icon: "/assets/image.svg",
        name: "Image",
      };

    case FabricObjectType.FREEFORM:
      return {
        icon: "/assets/freeform.svg",
        name: "Free Drawing",
      };
  }
};
