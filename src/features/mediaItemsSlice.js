import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all media items
export const fetchMediaItems = createAsyncThunk(
  "mediaItems/fetchMediaItems",
  async () => {
    const response = await axios.get("http://localhost:3001/mediaItems");
    return response.data;
  }
);

// Add a new media item
export const addMediaItem = createAsyncThunk(
  "mediaItems/addMediaItem",
  async (newMediaItem) => {
    const response = await axios.post(
      "http://localhost:3001/mediaItems",
      newMediaItem
    );
    return response.data;
  }
);

// Delete a media item
export const deleteMediaItem = createAsyncThunk(
  "mediaItems/deleteMediaItem",
  async (id) => {
    await axios.delete(`http://localhost:3001/mediaItems/${id}`);
    return id;
  }
);

// Update an existing media item
export const updateMediaItem = createAsyncThunk(
  "mediaItems/updateMediaItem",
  async (updatedMediaItem) => {
    const response = await axios.put(
      `http://localhost:3001/mediaItems/${updatedMediaItem.id}`,
      updatedMediaItem
    );
    return response.data;
  }
);

export const mediaItemsSlice = createSlice({
  name: "mediaItems",
  initialState: {
    mediaItems: [],
  },
  reducers: {},
  extraReducers: {
    [fetchMediaItems.fulfilled]: (state, action) => {
      state.mediaItems = action.payload;
    },
    [addMediaItem.fulfilled]: (state, action) => {
      state.mediaItems.push(action.payload);
    },
    [deleteMediaItem.fulfilled]: (state, action) => {
      state.mediaItems = state.mediaItems.filter(
        (item) => item.id !== action.payload
      );
    },
    [updateMediaItem.fulfilled]: (state, action) => {
      state.mediaItems = state.mediaItems.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export default mediaItemsSlice.reducer;