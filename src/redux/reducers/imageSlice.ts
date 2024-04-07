import { ImageProps } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  images: [] as ImageProps[],
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<ImageProps>) => {
      const payload = action.payload;
      const newImage: ImageProps = {
        id: payload.id,
        data_url: payload.data_url,
      };
      state.images.push(newImage);
    },
    deleteImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter(
        (image) => image.id !== action.payload,
      );
    },
  },
});

export const { addImage } = imageSlice.actions;

export default imageSlice.reducer;
