import { configureStore } from "@reduxjs/toolkit";
import employees from "./slices/employees";

const store = configureStore({
    reducer: {
        employees,
    }
});

export default store;