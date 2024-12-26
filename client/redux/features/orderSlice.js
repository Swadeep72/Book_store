import { createAsyncThunk } from "@reduxjs/toolkit";
import { TryCatch, defaultSlice } from "../utils";

export const placeOrder = createAsyncThunk("placeOrder", async () => await TryCatch("/orders/place-order", {}, "post"))
export const getAllOrders = createAsyncThunk("getAllOrders", async () => await TryCatch("/orders/get-all-orders", {}, "get"))
export const updateOrder = createAsyncThunk("updateOrder", async () => await TryCatch(`/orders/get-order-details/${id}`, {}, "put"))
export const getOrder = createAsyncThunk("getOrder", async () => await TryCatch(`/orders/update-status/${id}`, {}, "get"))

// const customActions = {
//     action: getMediaContents.fulfilled.type,
//     fn: (state, { payload }) => {
//         if (payload?.status) {
//             state.mediaContentList = JSON.parse(decrypt(payload.data))?.data || [];
//         }
//     }
// };

const orderSlice = defaultSlice("order", {
    extraReducers: [placeOrder, getAllOrders, updateOrder, getOrder],
    // customActions
})

export default orderSlice;