import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const TryCatch = async (url, args, method) => {
    try {
        const response = await axios?.[method](`http://localhost:1000${url}`, args)
        if (response) {
            return response?.data;
        }
    } catch (error) {
        throw error
    }
}

export const handleBuilderCases = ([state, { type, payload }, cust, loading]) => {
    if (!loading) {
        state.loading = type.endsWith('/pending');
    }
    if (cust) {
        if (Array.isArray(cust) && cust?.length) {
            cust.forEach(({ action, fn }) => {
                if (action === type) fn(state, { payload })
            })
        } else {
            if (cust.action === type) cust.fn(state, { payload })
        }
    }
};

export const defaultSlice = (name, { state, reducers = {}, extraReducers = [], customActions, terminateLoading }) => {
    if (!name.trim()) throw new Error(`defaultSlice: No name provided. Please specify a name for the slice.`);
    const defaultState = { loading: false }
    return createSlice({
        name,
        initialState: state ? { ...state, defaultState } : defaultState,
        reducers,
        extraReducers: builder => extraReducers.forEach(action => {
            builder.addCase(action.pending, (...res) => handleBuilderCases([...res, customActions, terminateLoading]))
                .addCase(action.rejected, (...res) => handleBuilderCases([...res, customActions, terminateLoading]))
                .addCase(action.fulfilled, (...res) => handleBuilderCases([...res, customActions, terminateLoading]));
        })
    })
}