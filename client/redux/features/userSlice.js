import { createAsyncThunk } from "@reduxjs/toolkit";
import { TryCatch, defaultSlice } from "../utils";

export const signUp = createAsyncThunk("sign-up", async () => await TryCatch("/users/sign-up", {}, "post"))
export const userLogin = createAsyncThunk("sign-in", async () => await TryCatch("/users/sign-in", {}, "post"))
export const updateAddress = createAsyncThunk("update-address", async () => await TryCatch("/users/update-address", {}, "post"))

// const customActions = {
//     action: getMediaContents.fulfilled.type,
//     fn: (state, { payload }) => {
//         if (payload?.status) {
//             state.mediaContentList = JSON.parse(decrypt(payload.data))?.data || [];
//         }
//     }
// };

const userSlice = defaultSlice("user", {
    extraReducers: [signUp, userLogin, updateAddress],
    // customActions
})

export default userSlice;