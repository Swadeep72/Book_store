import { createAsyncThunk } from "@reduxjs/toolkit";
import { TryCatch, defaultSlice } from "../utils";

export const signUp = createAsyncThunk("signUp", async (val) => await TryCatch("/users/sign-up", val, "post"))
export const userLogin = createAsyncThunk("userLogin", async (val) => await TryCatch("/users/sign-in", val, "post"))
export const updateAddress = createAsyncThunk("updateAddress", async () => await TryCatch("/users/update-address", {}, "post"))
export const getUserProfile = createAsyncThunk("getUserProfile", async () => await TryCatch("/users/get-user", {}, "get"))

const customActions = {
    action: userLogin.fulfilled.type,
    fn: (state, { payload }) => {
        if (payload?.status) {
            console.log(state)
            state.isLogin = true;
        }
    }
};

const reducers = {
    login: (state) => {
        state.isLogin = true;
    },
    logout: (state) => {
        state.isLogin = true;
    }
}

const userSlice = defaultSlice("user", {
    state: { isLogin: false },
    reducers,
    extraReducers: [signUp, userLogin, updateAddress, getUserProfile],
    customActions
})
export const { login, logout } = userSlice.actions;
export default userSlice;