import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthorState } from "@/lib/definitions";

const initialState: AuthorState = {
  author: null,
  posts: [],
  totalPages: 1,
  loading: false,
  error: null,
};

// Fetch author + paginated posts
export const fetchAuthor = createAsyncThunk(
  "author/fetch",
  async (
    { username, currentPage }: { username: string; currentPage: number },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.get(
        `/api/authors/${username}?page=${currentPage}&limit=5`
      );

      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthor.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.author = payload.author;
        state.posts = payload.author.posts;
        state.totalPages = payload.totalPages;
      })
      .addCase(fetchAuthor.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export default authorSlice.reducer;
