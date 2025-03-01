import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  postImage?: string;
  featured: boolean;
  published: boolean;
  authorId: string;
  categoryId: string;
  category: { id: string; name: string; slug: string };
  author: { name: string; username?: string };
  createdAt: string;
}

// Define the initial state
interface PostState {
  posts: Post[];
  singlePost: Post | null;

  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  loading: false,
  posts: [],
  singlePost: null,

  error: "",
};

export const fetchAllPost = createAsyncThunk(
  "post/fetchAllPost",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/posts");
      // console.log(data);

      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchSinglePost = createAsyncThunk(
  "post/fetchSinglePost",
  async (slug: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`/api/posts/${slug}`);
      console.log(data);

      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const createPost = createAsyncThunk(
  "create post",
  async (
    {
      title,
      content,
      categoryId,
      postImage,
      description,
      published,
    }: {
      title: string;
      content: string;
      categoryId: string;
      postImage: string;
      description: string;
      published: boolean;
    },
    thunkApi
  ) => {
    try {
      await axios.post(`/api/create`, {
        title,
        content,
        categoryId,
        postImage,
        description,
        published,
      });
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (slug: string, thunkApi) => {
    try {
      await axios.delete(`/api/posts/${slug}`);
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPost.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchAllPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.posts = payload;
      })
      .addCase(fetchAllPost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(fetchSinglePost.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.singlePost = null;
      })
      .addCase(fetchSinglePost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.singlePost = payload;
      })
      .addCase(fetchSinglePost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export default postSlice.reducer;
