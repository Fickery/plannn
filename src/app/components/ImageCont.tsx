import React from "react";
import Draggable from "react-draggable";
import ImageDropdownArrow from "./ImageDropdownArrow";

function ImageCont({ imageList, onImageRemove, onImageUpdate }) {
  return (
    <div>
      {imageList.map((image, index) => (
        <Draggable key={image.id} defaultPosition={{ x: 350, y: 550 }}>
          <div
            className="absolute cursor-pointer bg-white"
            id={`image-${image.id}`}
          >
            <div>
              <div className="absolute flex w-full justify-end"></div>
              <img draggable={false} src={image.data_url} width="200" />
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
