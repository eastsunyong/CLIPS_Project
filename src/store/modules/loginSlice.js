import { createSlice } from "@reduxjs/toolkit";

const initialState = {
<<<<<<< HEAD
  login: false,
};

export const loginSlice = createSlice({
  name: "LOGIN",
  initialState,
  reducers: {
    isLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { isLogin } = loginSlice.actions;
export default loginSlice.reducer;
=======
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
>>>>>>> 8d3e2b4d47a3322814312123280d3887a4375aa2
