import CustomFabricObject from "@/types/customFabricObject";
import { Canvas, FabricImage } from "fabric";

interface ImageUploadProps {
  file: File;
  canvas: React.MutableRefObject<Canvas | undefined>;
  shapeRef: React.MutableRefObject<CustomFabricObject | null>;
  syncShapeInStorage: (shape: Object) => void;
}
function handleImageUpload({
  file,
  canvas,
  shapeRef,
  syncShapeInStorage,
}: ImageUploadProps) {
  const reader = new FileReader();

  reader.onload = () => {
    FabricImage.fromURL(reader.result as string).then(
      (img: CustomFabricObject) => {
        img.scaleToWidth(200);
        img.scaleToHeight(200);

        canvas.current?.add(img);

        img.objectId = crypto.randomUUID();

        shapeRef.current = img;

        syncShapeInStorage(img);
        canvas.current?.requestRenderAll();
      },
    );
  };

  reader.readAsDataURL(file);
}

export default handleImageUpload;
