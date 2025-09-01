import {createSlice} from '@reduxjs/toolkit';

interface User {
    id?: string;
    name?: string;
    email?: string;
    // Add other user properties as needed
}

const initialState = {
    token: localStorage.getItem('token') || null,
    name: "",
    email: "",
    password: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "", 
    loading: false,
    error: null as string | null,
    isAuthenticated: false,
    user: null as User | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure(state, action) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;