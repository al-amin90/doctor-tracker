const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  user: null,
  token: null,
  lastActivity: Date.now(),
  message: null,
};

const authSlice = createSlice({
  name: "eqrah-auth",
  initialState,
  reducers: {
    setAllUser: (state, action) => {
      const { user, token, message } = action.payload;
      state.user = user;
      state.token = token;
      state.message = message;
      state.lastActivity = Date.now();
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.message = null;
      state.lastActivity = null;
    },
    updateActivity: (state) => {
      state.lastActivity = Date.now();
    },
  },
});

export const selectToken = (state) => state?.auth?.token;
export const { setAllUser, logout, updateActivity } = authSlice.actions;
export default authSlice.reducer;
export const selectUser = (state) => state.auth.user;

