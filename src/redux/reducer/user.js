import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  signedIn: false
}

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
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { SignOn } = userSlice.actions

// Export the slice reducer as the default export
export default userSlice.reducer