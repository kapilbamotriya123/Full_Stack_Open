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

const {addNotification} = notificationSlice.actions


export const notification = (notif) => {
    return dispatch => {
      setTimeout(() => {
        addNotification('')
      }, 5000);
      dispatch(addNotification(notif))
    }
  }

export default notificationSlice.reducer