import { configureStore } from "@reduxjs/toolkit";
import employees from "./slices/employees";
import alerts from "./slices/alerts";

const store = configureStore({
    reducer: {
        employees,
        alerts
    }
});

export default store;