import Draggable from "react-draggable";
import ImageDropdownArrow from "./ui/ImageDropdownArrow";

interface ImageContProps {
  imageList: Array<{ id: string; data_url: string }>;
  onImageRemove: (index: number) => void;
  onImageUpdate: (index: number) => void;
}

function ImageCont({
  imageList,
  onImageRemove,
  onImageUpdate,
}: ImageContProps) {
  return (
    <div>
      {imageList.map((image, index) => (
        <Draggable defaultPosition={{ x: 350, y: 550 }}>
          <div className="absolute cursor-pointer bg-white">
            <div key={image.id}>
              <div className="absolute flex w-full justify-end"></div>
              <img
                draggable={false}
                id={image.id}
                src={image.data_url}
                width="200"
              />
              <ImageDropdownArrow
                onImageRemove={onImageRemove}
                onImageUpdate={onImageUpdate}
                index={index}
              />
            </div>
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default ImageCont;
