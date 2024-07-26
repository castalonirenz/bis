import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  list: [],
  status: 'idle',  // Start with 'idle' instead of 'false'
  token: '',
};

// Create axios instance
const apiClient = axios.create({
  baseURL: 'http://3.0.89.216/api',
});

// Add a response interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized - 401');
      // Handle unauthorized access, e.g., redirect to login
    }
    return Promise.reject(error);
  }
);

// Define async thunks
export const loadOfficials = createAsyncThunk('user/getofficial', async (bearer) => {
  const res = await apiClient.post('/viewBarangayOfficials', {
    headers:{
        'Authorization': bearer, // Replace with your actual token
        'Content-Type': 'application/json',
    }
  });
  return res.data;
});


// Create slice
const officialsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LoadOfficials: (state, action) => {
      state.user = action.payload;
      state.signedIn = true;  // Use a boolean value here
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadOfficials.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadOfficials.fulfilled, (state, action) => {
        console.log(action, "--> RECEIVED DATA")
        state.status = 'succeeded';
        // state.list = action.payload.access_token;
      })
      .addCase(loadOfficials.rejected, (state) => {
        console.log('pumasok ka sa fail')
        state.status = 'failed';
      });
  },
});

// Export actions and reducer
export const { LoadOfficials } = officialsSlice.actions;
export default officialsSlice.reducer;
