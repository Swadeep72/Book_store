import { createAsyncThunk } from "@reduxjs/toolkit";
import { TryCatch, defaultSlice } from "../utils";

export const addToFavouites = createAsyncThunk("addToFavouites", async (id) => await TryCatch("/favourites/add-to-favourites", { bookId: id }, "post"))
export const removeFavourites = createAsyncThunk("removeFavourites", async (id) => await TryCatch("/favourites/remove-from-favourites", { bookId: id }, "post"))
export const getFavourites = createAsyncThunk("getFavourites", async () => await TryCatch("/favourites/get-favourites", {}, "get"))

// const customActions = {
//     action: getMediaContents.fulfilled.type,
//     fn: (state, { payload }) => {
//         if (payload?.status) {
//             state.mediaContentList = JSON.parse(decrypt(payload.data))?.data || [];
//         }
//     }
// };

const favouriteSlice = defaultSlice("favourite", {
    extraReducers: [addToFavouites, removeFavourites, getFavourites],
    // customActions
})

export default favouriteSlice;