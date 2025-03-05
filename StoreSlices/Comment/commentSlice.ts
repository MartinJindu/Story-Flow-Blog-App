import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CommentState } from "@/lib/definitions";

const initialState: CommentState = {
  loading: false,
  comments: [],
  error: null,
};

export const getComments = createAsyncThunk(
  "fetch/comments",
  async ({ postId }: { postId: string }, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/comments?postId=${postId}`);

      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// post comment
export const postComment = createAsyncThunk(
  "post/comment",
  async (
    { content, postId }: { content: string; postId: string },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post(`/api/comments`, { content, postId });
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.comments = payload;
      })
      .addCase(getComments.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(postComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postComment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.comments.unshift(payload); // Add new comment to the beginning of the comment array
      })
      .addCase(postComment.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export default commentSlice.reducer;
