import { configureStore } from "@reduxjs/toolkit";
import genresReducer from "../features/genresSlice";
import mediaItemsReducer from "../features/mediaItemsSlice";

export default configureStore({
  reducer: {
    genres: genresReducer,
    mediaItems: mediaItemsReducer,
  },
});