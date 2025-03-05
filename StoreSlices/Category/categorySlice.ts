import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CategoryState } from "@/lib/definitions";

const initialState: CategoryState = {
  loading: false,
  categories: [],
  error: null,
};

export const getCategory = createAsyncThunk(
  /**
   * Fetch all categories
   */
  "category/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/categories");

      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload;
      })
      .addCase(getCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export default categorySlice.reducer;
