import { createSlice } from "@reduxjs/toolkit";

const authUserSlice = createSlice({
    name: "authUser",
    initialState: {
        user: null,
        loading: true,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});


export const { setUser, setLoading } = authUserSlice.actions;
export default authUserSlice.reducer;