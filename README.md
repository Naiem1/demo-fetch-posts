# Fetch post and show last 7 days createAt and UpdatedAt data

1. **Step 1:  At first setup the Redux Slice**
    
    create and post slice and call createslice() function inside the createslice() we initialize state and reducer. We only fetch data so we need extendReducer() for data fulfill, reject or pending.
    
2. **Step 2: Define the asynchronous thunk for fetching the posts.**
    
    In this thunk function we fetch data using Axios and we get data.
    
3. **Step 3: handles the logic to filter  the posts created or updated within the last 7 days**
   
    After fetching the posts from the API, we filter the results to only posts that were created and update within the last days.
    CurrentDate keeps the current date, whereas the sevenDaysAgo variable holds the date exactly seven days ago.
   The createdAt or updatedAt dates of each post are then compared to these values to see if they fall within the specified time frame.
    Now filter between currnetDate and severDaysAgo and return sliced data.
    
4. **Step 4: Set up the Redux Store**
    
    Import the postsSlice and add it to the configureStore function in your store setup file.
    
5. **Step 5: Update State**
    
    If  fetchPost data is fulfill then update the store that we created.
    
6. **Step 6: Fetch posts and dispatch the async action in UI**
    
    In your component, you can use react-redux useDispatch hook to **trigger** the fetchPosts action to fetch posts. and Show to UI

## Code
**This all code are demo code only for showing purpouse all the dependencies are not installed**

`postSlice.js`

```js
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

```
`store.js`

```js
import { configureStore } from '@reduxjs/toolkit'; // Not installed
import postsReducer from './postsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
```
`postComponent.jsx`

```js
// This all are the demo code this not workable only for showing purpouse
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './postsSlice';

const PostsComponent = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);
  const loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>{posts}</div>
    )
};

export default PostsComponent;
```
