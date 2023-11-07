import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const alertSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        addAlert: (_state, action) => {
            return action.payload;
        },
        removeAlert: (_state, _action) => {
            return null;
        }
    },
});

export const { addAlert } = alertSlice.actions;
export default alertSlice.reducer;