import { createAsyncThunk } from "@reduxjs/toolkit";
import { TryCatch, defaultSlice } from "../utils";

export const addToCart = createAsyncThunk("addToCart", async () => await TryCatch("/carts/add-to-cart", {}, "post"))
export const removeFromCart = createAsyncThunk("removeFromCart", async () => await TryCatch("/carts/remove-from-cart", {}, "post"))
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