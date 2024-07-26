import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
  user: null,
  signedIn: false,
  status: false
}

export const loginUser = createAsyncThunk('todos/fetchTodos', async () => {
  // Just make the async request here, and return the response.
  // This will automatically dispatch a `pending` action first,
  // and then `fulfilled` or `rejected` actions based on the promise.
  // as needed based on the
  const res = await axios.post('https://3.0.89.216/api/manualLogin',{
    email: 'keanu@gmail.com',
    pass:'secret123'
  })
  return res.data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    SignOn:(state, action) => {
    
      console.log(action.payload, "--> RECEIVED")
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.user = action.payload
      state.signedIn = ''
    }
  },
  extraReducers: builder => {
    // Use `extraReducers` to handle actions that were generated
    // _outside_ of the slice, such as thunks or in other slices
    builder
      .addCase(loginUser.pending, (state, action) => {
        console.log('pending')
        state.status = 'loading'
      })
      // Pass the generated action creators to `.addCase()`
      .addCase(loginUser.fulfilled, (state, action) => {
        // Same "mutating" update syntax thanks to Immer
        console.log('fulfilled', action.payload)
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('failed')
        state.status = 'failed'
        state.user = []
        state.error = action.error
      })
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { SignOn } = userSlice.actions

// Export the slice reducer as the default export
export default userSlice.reducer