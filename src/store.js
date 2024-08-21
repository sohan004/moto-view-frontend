import { configureStore } from "@reduxjs/toolkit";
import authUserSlice from "./features/authUser/authUserSlice";

const store = configureStore({
    reducer: {
        // test: testSlice.reducer
        auth: authUserSlice
    }
});


export default store;