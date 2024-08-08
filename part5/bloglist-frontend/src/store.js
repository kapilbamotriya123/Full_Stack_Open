import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blog: blogReducer
    }
})

export default store