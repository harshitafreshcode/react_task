import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployees: (_state, action) => {
            return action.payload;
        },
        deleteEmployee: (state, action) => {
            return state?.filter(employee => employee?.id !== action.payload);
        },
        addNewEmployee: (state, action) => {
            return [...state, action.payload];
        },
    },
});

export const { addEmployees, deleteEmployee, addNewEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;