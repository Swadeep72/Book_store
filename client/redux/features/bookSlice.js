import { createAsyncThunk } from "@reduxjs/toolkit";
import { TryCatch, defaultSlice } from "../utils";

export const getRecentBooks = createAsyncThunk("getRecentBooks", async () => await TryCatch("/books/get-recent-books", {}, "get"))
export const getAllBooks = createAsyncThunk("getAllBooks", async () => await TryCatch("/books/get-books", {}, "get"))
export const addBook = createAsyncThunk("addBook", async () => await TryCatch("/books/add-book", {}, "post"))
export const updateBook = createAsyncThunk("updateBook", async () => await TryCatch(`/books/book/${id}`, {}, "put"))
export const deleteBook = createAsyncThunk("deleteBook", async () => await TryCatch(`/books/book/${id}`, {}, "delete"))
export const getBook = createAsyncThunk("getBook", async (id) => await TryCatch(`/books/book/${id}`, {}, "get"))

// const customActions = {
//     action: getMediaContents.fulfilled.type,
//     fn: (state, { payload }) => {
//         if (payload?.status) {
//             state.mediaContentList = JSON.parse(decrypt(payload.data))?.data || [];
//         }
//     }
// };

const bookSlice = defaultSlice("book", {
    extraReducers: [getRecentBooks, getAllBooks, updateBook, addBook, getBook, deleteBook],
    // customActions
})

export default bookSlice;