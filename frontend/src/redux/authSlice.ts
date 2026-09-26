import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { email: string; role: string } | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const getInitialState = (): AuthState => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  if (token && role && email) {
    return {
      user: { email, role },
      isAuthenticated: true,
      isAdmin: role === "admin",
    };
  }

  return {
    user: null,
    isAuthenticated: false,
    isAdmin: false,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ email: string; role: string; token: string }>
    ) => {
      state.user = { email: action.payload.email, role: action.payload.role };
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role === "admin";

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("email", action.payload.email);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
