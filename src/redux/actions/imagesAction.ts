export const addImage = (image) => {
  return {
    type: "ADD_IMAGE",
    payload: image,
  };
};

export const updateImage = (id, updatedImage) => {
  return {
    type: "UPDATE_IMAGE",
    payload: { id, updatedImage },
  };
};

export const deleteImage = (id) => {
  return {
    type: "DELETE_IMAGE",
    payload: id,
  };
};
