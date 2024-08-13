import CustomFabricObject from "@/types/customFabricObject";
import { Canvas, FabricImage } from "fabric";

function handleImageUpload(
  file: File,
  canvas: Canvas,
  shapeRef: React.MutableRefObject<CustomFabricObject | null>,
  syncShapeInStorage: (shape: Object) => void,
) {
  const reader = new FileReader();

  reader.onload = () => {
    FabricImage.fromURL(reader.result as string).then(
      (img: CustomFabricObject) => {
        img.scaleToWidth(200);
        img.scaleToHeight(200);

        canvas?.add(img);

        img.objectId = crypto.randomUUID();

        shapeRef.current = img;

        syncShapeInStorage(img);
        canvas?.requestRenderAll();
      },
    );
  };

  reader.readAsDataURL(file);
}

export default handleImageUpload;
