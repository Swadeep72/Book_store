import { createAsyncThunk } from "@reduxjs/toolkit";
import { TryCatch, defaultSlice } from "../utils";

export const addToCart = createAsyncThunk("addToCart", async (id) => await TryCatch("/carts/add-to-cart", { bookId: id }, "post"))
export const removeFromCart = createAsyncThunk("removeFromCart", async (id) => await TryCatch("/carts/remove-from-cart", { bookId: id }, "post"))
export const getCart = createAsyncThunk("getCart", async () => await TryCatch("/carts/get-cart", {}, "get"))

// const customActions = {
//     action: getMediaContents.fulfilled.type,
//     fn: (state, { payload }) => {
//         if (payload?.status) {
//             state.mediaContentList = JSON.parse(decrypt(payload.data))?.data || [];
//         }
//     }
// };

const cartSlice = defaultSlice("cart", {
    extraReducers: [addToCart, removeFromCart, getCart],
    // customActions
})

export default cartSlice;