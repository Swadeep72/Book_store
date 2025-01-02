import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const TryCatch = async (url, args, method) => {
    try {
        const headers = {
            authorization: `Verify|${localStorage?.getItem("token")}`
        }
        console.log(headers, url, args, method)
        // const response = await axios?.[method](`http://localhost:1000${url}`, args, headers)
        const response = await axios({
            method,
            headers,
            url: `${process?.env?.VITE_API_URL ||"http://localhost:1000"}${url}`,
            data: args
        })
        if (response) {
            return response?.data;
        }
    } catch (error) {
        return error?.response?.data
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
        initialState: state ? { ...state, ...defaultState } : defaultState,
        reducers,
        extraReducers: builder => extraReducers.forEach(action => {
            builder.addCase(action.pending, (...res) => handleBuilderCases([...res, customActions, terminateLoading]))
                .addCase(action.rejected, (...res) => handleBuilderCases([...res, customActions, terminateLoading]))
                .addCase(action.fulfilled, (...res) => handleBuilderCases([...res, customActions, terminateLoading]));
        })
    })
}