import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, hydrated: false },
  reducers: {
    hydrateAuth(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.hydrated = true;
    },
    setSession(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.hydrated = true;
    },
    updateUser(state, action) {
      state.user = state.user ? { ...state.user, ...action.payload } : action.payload;
    },
    clearSession(state) {
      state.user = null;
      state.token = null;
      state.hydrated = true;
    },
  },
});

export const { hydrateAuth, setSession, updateUser, clearSession } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;
