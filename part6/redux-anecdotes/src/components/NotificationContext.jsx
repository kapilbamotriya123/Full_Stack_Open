import { useContext } from "react"
import { createContext } from "react"
import { useReducer } from "react"

const noficationReducer = (state, action) => {
    switch(action.type) {
        case "notify": 
            return action.payload 
    }
}

const notificationContext = createContext()

const NotificationContextProvider = (props) => {
    
    const [notication, noticationDispatch] = useReducer(noficationReducer, null)
    
    return (
        <notificationContext.Provider value={[notication, noticationDispatch]}>
            {props.children}
        </notificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const noticationAndDispatch = useContext(notificationContext)
    return noticationAndDispatch[0]
}
export const useNotificationDispatch = () => {
    const notifcationAndDispatch = useContext(notificationContext)
    return notifcationAndDispatch[1]
}

export {NotificationContextProvider}
export default notificationContext