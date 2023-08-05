import { configureStore } from '@reduxjs/toolkit'; // Not installed
import postsReducer from './postsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
