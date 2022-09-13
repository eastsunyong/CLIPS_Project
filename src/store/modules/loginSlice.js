import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: false
};

export const loginSlice = createSlice({
    name: "LOGIN",
    initialState,
    reducers: {
        addNumber: (state, action) => {
            state.page =  action.payload
        },
        minusNumber: (state, action) => {
            state.page = state.page - action.payload
        },
    },
});

export const { addNumber, minusNumber } = loginSlice.actions;
export default loginSlice.reducer;