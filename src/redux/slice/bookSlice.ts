import { API_HOST } from "@/config";
import { payloadCreateBook } from "@/typings/payloadApi";
import { alertMessage } from "@/utils/alertMessage";
import { bookStatus } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export interface BookState {
  data: any;
  isError: boolean | null;
  isLoading: boolean | null;
  page: string | number;
  size: string | number;
  message: string | null | unknown;
  title: string | null;
  status: bookStatus | string;
  dataBook: book | {};
}

const initialState: BookState = {
  data: {},
  isError: null,
  isLoading: false,
  page: 1,
  size: 4,
  message: "",
  title: "",
  status: "",
  dataBook: {} as Partial<bookDetail>,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    resetBookRedux: (state) => {
      state.data = {};
      state.isLoading = null;
      state.isError = false;
      state.page = 1;
      state.size = 4;
      state.title = "";
      state.status = "";
    },
    addnewPage: (state, action) => {
      state.page = action.payload;
    },
    changeTitle: (state, action) => {
      console.log("action payload", action.payload);
      state.title = action.payload;
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
    changeFilter: (state, action) => {
      state.page = action.payload.page;
      state.title = action.payload.title;
      state.status = action.payload.status;
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

    builder.addCase(postBook.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postBook.fulfilled, (state, action) => {
      state.page = 1;
      state.isLoading = false;
      state.data = action.payload.data;
      state.message = action.payload.data.message;
    });
    builder.addCase(postBook.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(deleteBook.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.page = 1;
      state.isLoading = false;
      state.data = action.payload.data;
      state.message = action.payload.data.message;
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(putBook.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(putBook.fulfilled, (state, action) => {
      state.page = 1;
      state.isLoading = false;
    });
    builder.addCase(putBook.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(getBookById.pending, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(getBookById.fulfilled, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.dataBook = action.payload.data;
    });
    builder.addCase(getBookById.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const getBooks = createAsyncThunk<
  booksResponse,
  void,
  { rejectValue: string }
>("getUsers", async (_, thunkAPI) => {
  try {
    const token: string = Cookies.get("tokenLogin") || "";
    const state = thunkAPI.getState() as { book: BookState };
    const { page, size, title, status } = state.book;
    const data = await axios.get(
      `${API_HOST}books?page=${page}&size=${size}&title=${title}&status=${status}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("get books", data);
    return data.data;
  } catch (err: any) {
    const errorMessage = err.response?.data || "Something went wrong";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const postBook = createAsyncThunk(
  "postBook",
  async (formData: payloadCreateBook, thunkAPI) => {
    try {
      const token: string = Cookies.get("tokenLogin") || "";
      const res = await axios.post(`${API_HOST}books`, formData, {
        headers: {
          Authorization: token,
        },
      });
      alertMessage(res.data.message, "success");
      return res;
    } catch (err: any) {
      console.log("error post book", err);
      const errorMessage = err.response?.data || "Something went wrong";
      alertMessage(err.response?.data.message, "error");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "deleteBook",
  async (id: number, thunkAPI) => {
    try {
      const token: string = Cookies.get("tokenLogin") || "";
      const res = await axios.delete(`${API_HOST}books/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      alertMessage(res.data.message, "success");
      return res;
    } catch (err: any) {
      console.log("error post book", err);
      const errorMessage = err.response?.data || "Something went wrong";
      alertMessage(err.response?.data.message, "error");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const putBook = createAsyncThunk(
  "putBook",
  async (data: any, thunkAPI) => {
    try {
      const token: string = Cookies.get("tokenLogin") || "";
      const res = await axios.put(
        `${API_HOST}books/${data.id}`,
        data.formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alertMessage(res.data.message, "success");
      return res;
    } catch (err: any) {
      console.log("error post book", err);
      const errorMessage = err.response?.data || "Something went wrong";
      alertMessage(err.response?.data.message, "error");
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getBookById = createAsyncThunk<
  bookDetail,
  string,
  { rejectValue: string }
>("getBookById", async (id, thunkAPI) => {
  try {
    const token: string = Cookies.get("tokenLogin") || "";
    if (token) {
      const data = await axios.get(`${API_HOST}books/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return data.data;
    }
  } catch (err: any) {
    const errorMessage = err.response?.data || "Something went wrong";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const {
  resetBookRedux,
  addnewPage,
  changeTitle,
  changeStatus,
  changeFilter,
} = bookSlice.actions;

export default bookSlice.reducer;
