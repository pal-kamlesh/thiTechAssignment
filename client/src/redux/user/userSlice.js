import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  currentUser: null,
  allUsers: [],
  loading: false,
  initials: [],
};

export const login = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "logout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const register = createAsyncThunk(
  "register/user",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const registerFeedback = createAsyncThunk(
  "post/feedback",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllFeedbacks = createAsyncThunk(
  "get/feedack",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/feedback");
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const editTheFeedback = createAsyncThunk(
  "post/editFeedback",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/feedback", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteTheFeedback = createAsyncThunk(
  "post/deleteFeedback",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/feedback", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminFeedbacks = createAsyncThunk(
  "get/feedack/for/admin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/adminFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "get/users",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/user/allUsers");
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogout: (state) => {
      state.currentUser = null;
      window.localStorage.removeItem("persist:root");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message, { autoClose: 1000 });
        state.currentUser = action.payload.result;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message, { autoClose: 1000 });
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message, { autoClose: 1000 });
      })

      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allUsers.push(payload.result);
        toast.success(payload.message);
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message, { autoClose: 1000 });
      });
  },
});

export const { handleLogout } = userSlice.actions;
export default userSlice.reducer;
