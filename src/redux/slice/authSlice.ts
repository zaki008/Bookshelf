import { API_HOST } from "@/config";
import { payloadLogin, payloadRegister } from "@/typings/payloadApi";
import { alertMessage } from "@/utils/alertMessage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { persistStore } from "redux-persist";
import { store } from "../store";

interface AuthState {
  data: any | null;
  isError: boolean | null;
  isLoading: boolean | null;
  message: string | null | unknown;
  isSuccess: boolean;
  isLogin: boolean;
  userData:
    | {
        name: string;
        username: string;
        exp: string;
        iat: string;
      }
    | null
    | unknown;
}

const initialState: AuthState = {
  data: null,
  isError: null,
  isLoading: false,
  message: null,
  isSuccess: false,
  isLogin: false,
  userData: {
    name: "",
    username: "",
    exp: "",
    iat: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthRedux: (state) => {
      state.data = null;
      state.isLoading = null;
      state.isError = false;
      state.message = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postRegister.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postRegister.fulfilled, (state, action) => {
      state.message = action.payload.data.message;
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(postRegister.rejected, (state, err: any) => {
      state.isError = true;
      state.isLoading = false;
      state.message = err.payload.message;
    });

    builder.addCase(postLogin.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.message = action?.payload?.data?.message;
      state.isLoading = false;
      state.isSuccess = true;
      state.isLogin = action?.payload?.data?.data?.token ? true : false;
      state.userData = jwt.decode(action?.payload?.data?.data?.token);
    });
    builder.addCase(postLogin.rejected, (state, err: any) => {
      state.isError = true;
      state.isLoading = false;
      state.message = err.payload.message;
    });

    builder.addCase(postLogout.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postLogout.fulfilled, (state, action) => {
      state.message = action?.payload?.data?.message;
      state.isLoading = false;
      state.isSuccess = true;
      state.isLogin = false;
      state.userData = { name: "", username: "", exp: "", iat: "" };
    });
    builder.addCase(postLogout.rejected, (state, err: any) => {
      state.isError = true;
      state.isLoading = false;
      state.message = err.payload.message;
    });
  },
});

export const postRegister = createAsyncThunk(
  "postRegister",
  async (formData: payloadRegister, thunkAPI) => {
    try {
      const data = await axios.post(`${API_HOST}auth/register`, formData);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const postLogin = createAsyncThunk(
  "postLogin",
  async (formData: payloadLogin, thunkAPI) => {
    try {
      const res = await axios.post(`${API_HOST}auth/login`, formData);
      const token = `Bearer ${res.data.data.token}`;
      Cookies.set("tokenLogin", token, { expires: 7 });
      alertMessage(res.data.message, "success");
      return res;
    } catch (err: any) {
      alertMessage(err.response?.data?.message, "error");
      const errorMessage = err.response?.data || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const postLogout = createAsyncThunk(
  "postLogout",
  async (_, thunkAPI) => {
    try {
      const token: any = Cookies.get("tokenLogin");
      const res = await axios.post(`${API_HOST}auth/logout`, null, {
        headers: {
          Authorization: token,
        },
      });
      if (res) {
        const persistor = persistStore(store);
        Cookies.remove("tokenLogin");
        persistor.purge();
        thunkAPI.dispatch({ type: "LOGOUT" });
        alertMessage("berhasil logout", "success");
        window.location.assign("/auth/login");
        return res;
      }
    } catch (err: any) {
      alertMessage(err.response?.data?.message, "error");
      const errorMessage = err.response?.data || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const { resetAuthRedux } = authSlice.actions;

export default authSlice.reducer;
