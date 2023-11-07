import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployees: (_state, action) => {
            return action.payload;
        }
    },
});

export const { addEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;