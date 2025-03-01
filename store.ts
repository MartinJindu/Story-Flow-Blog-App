import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./StoreSlices/Post/postSlice";
import categorySlice from "./StoreSlices/Category/categorySlice";
import authorSlice from "./StoreSlices/Author/authorSlice";
import commentSlice from "./StoreSlices/Comment/commentSlice";

export const store = configureStore({
  reducer: {
    post: postSlice,
    category: categorySlice,
    author: authorSlice,
    comment: commentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
