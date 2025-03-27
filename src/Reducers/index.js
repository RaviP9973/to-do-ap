import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice";
import toDoReducer from "../slices/toDoSlice";

const rootReducer = combineReducers({
    // Define your reducers 
    auth: authReducer,
    todo: toDoReducer,
})

export default rootReducer;