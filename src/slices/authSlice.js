import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false, // User is not logged in by default

};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.isAuthenticated = true; // Set the user as authenticated
        },
        logout(state) {
            state.isAuthenticated = false; // Set the user as not authenticated
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;