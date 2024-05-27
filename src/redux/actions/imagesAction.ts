export const addImage = (image) => {
  return {
    type: "ADD_IMAGE",
    payload: image,
  };
};

export const deleteImage = (id) => {
  return {
    type: "DELETE_IMAGE",
    payload: id,
  };
};
