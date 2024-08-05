import { useCounterValue, useCounterDispatch } from "./components/CounterContext"

const App =() => {
  const counter = useCounterValue()
  const dispatch = useCounterDispatch()
  
  return (  

  <div>
    <div>{counter}</div>
    <div>
      <button onClick={() => dispatch({ type: "INC"})}>+</button>
      <button onClick={() => dispatch({ type: "DEC"})}>-</button>
      <button onClick={() => dispatch({ type: "ZERO"})}>0</button>
    </div>
  </div>
)}
export default App