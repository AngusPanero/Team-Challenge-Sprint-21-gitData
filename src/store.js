import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        userSelector: userSlice
    }
});

export default store;