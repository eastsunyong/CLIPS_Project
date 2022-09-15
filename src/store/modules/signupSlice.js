import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {}
};

export const loginSlice = createSlice({
    name: "SIGNUP",
    initialState,
    reducers: {
        signUpData: (state, action) => {
            console.log(action)
            state.data = action.payload
        }
    },
});

export const { signUpData } = loginSlice.actions;
export default loginSlice.reducer;