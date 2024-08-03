import { createSlice } from "@reduxjs/toolkit";

const notificationSlice =createSlice({
    name: 'notification',
    initialState: '' ,
    reducers : {

        addNotification(state, action) {
            return action.payload
        }
    }
})

export default notificationSlice.reducer
export const {addNotification} = notificationSlice.actions