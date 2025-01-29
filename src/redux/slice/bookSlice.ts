import { API_HOST } from "@/config";
import { payloadGetBook } from "@/typings/payloadApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface BookState {
  data: any | null;
  isError: boolean | null;
  isLoading: boolean | null;
}

const initialState: BookState = {
  data: null,
  isError: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthRedux: (state) => {
      state.data = null;
      state.isLoading = null;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const getBooks = createAsyncThunk(
  "getUsers",
  async (params: payloadGetBook, thunkAPI) => {
    try {
      const token: any = Cookies.get("tokenLogin");
      const data = await axios.get(
        `${API_HOST}books?page=${params.page}&size=${params.size}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data.data;
    } catch (err: any) {
      const errorMessage = err.response?.data || "Something went wrong";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const { resetAuthRedux } = authSlice.actions;

export default authSlice.reducer;
