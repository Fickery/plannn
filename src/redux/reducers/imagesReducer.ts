const initialState = {
  images: [],
};

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_IMAGE":
      const { id, updatedImage } = action.payload;
      const updatedImages = state.images.map((image) =>
        image.id === id ? updatedImage : image,
      );
      return {
        ...state,
        images: updatedImages,
      };

    case "ADD_IMAGE":
      return {
        ...state,
        images: [...state.images, action.payload],
      };

    case "DELETE_IMAGE":
      return {
        ...state,
        notes: state.images.filter((image) => image.id !== action.payload),
      };

    default:
      return state;
  }
};

export default imagesReducer;
