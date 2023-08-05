import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Not installed

import axios from 'axios'; // Not installed

// Demo Post link and it is not valid link
const API_URL = 'https://example.com/api/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(apiUrl);
    const allPosts = response.data;

    // Calculate between today and last 7 day time stamp
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Filter posts created or updated in the last 7 days 
    const filteredPosts = allPosts.filter((post) => {
      const postDate = new Date(post.createdAt || post.updatedAt);
      return postDate >= sevenDaysAgo && postDate <= currentDate;
    });

    return filteredPosts;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
});


const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
