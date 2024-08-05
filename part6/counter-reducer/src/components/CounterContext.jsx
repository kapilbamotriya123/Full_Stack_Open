//what we want tis we want to make this counter and it dispatchCounter accessible to every children app inside this comp

import { createContext, useContext, useReducer } from "react"

const counterReducer = (state, action) => {
    switch (action.type) {
      case "INC":
          return state + 1
      case "DEC":
          return state - 1
      case "ZERO":
          return 0
      default:
          return state
    }
  }

  const counterContext = createContext()

  export const useCounterValue = () => {
    const counterAndDispatch = useContext(counterContext)
    return counterAndDispatch[0]
  }

  export const useCounterDispatch = () => {
    const counterAndDispatch = useContext(counterContext)
    return counterAndDispatch[1]
  }

  export const CounterContextProvider = (props) => {
    const [counter, counterDispatch] = useReducer(counterReducer, 0)

    return (
        <counterContext.Provider value = {[ counter, counterDispatch]} >
            { props.children }
        </counterContext.Provider>
    )   
  }

  export default counterContext