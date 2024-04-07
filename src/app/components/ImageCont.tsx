import React from "react";
import Draggable from "react-draggable";
import ImageDropdownArrow from "./ui/ImageDropdownArrow";
import { v4 as uuidv4 } from "uuid";

function ImageCont({ imageList, onImageRemove, onImageUpdate }) {
  const handleSeeImageData = (image) => {
    console.log("image data", {
      id: image.id,
      data_url: image.data_url,
    });
  };
  return (
    <div>
      {imageList.map((image, index: number) => (
        <Draggable defaultPosition={{ x: 350, y: 550 }}>
          <div className="absolute cursor-pointer bg-white">
            <div>
              <div className="absolute flex w-full justify-end"></div>
              <img
                draggable={false}
                id={image.id}
                src={image.data_url}
                width="200"
              />
              <div className="h-10 w-fit bg-slate-500">
                <button onClick={() => handleSeeImageData(image)}>
                  see img data
                </button>
              </div>
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
