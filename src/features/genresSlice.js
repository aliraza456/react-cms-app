import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all genres
export const fetchGenres = createAsyncThunk(
  "genres/fetchGenres",
  async () => {
    const response = await axios.get("http://localhost:3001/genres");
    return response.data;
  }
);

export const genresSlice = createSlice({
  name: "genres",
  initialState: {
    genres: [],
    selectedGenre: {},
  },
  reducers: {
    changeGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
  },
  extraReducers: {
    [fetchGenres.fulfilled]: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { changeGenre } = genresSlice.actions;

export default genresSlice.reducer;