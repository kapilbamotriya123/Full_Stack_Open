import { useState } from 'react'
const Average = (prop) => {
  return (
    <p>average: {(prop.good - prop.bad)/prop.all}</p>
  )
}
  const Positive = (prop) => {
    return (
      <p>average: {100*(prop.good)/prop.all}%</p>
    )  

}
const Button = (props) => {
  return (
    <button onClick = {props.eventHandler}>{props.text}</button>
  )
}

const Statistics = ({good,neutral,bad,all}) => {
  if ({all}.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
    <p>good:  {good}</p>
    <p>neutral:  {neutral}</p>
    <p>bad:  {bad}</p>
    <p>All: {all}</p>
    <Average good = {good} bad = {bad} all = {all}/>
    <Positive good = {good} all = {all}/>
    </div>
)
}

const Display = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  //three event handlers are to be created for three buttons 
  const handleGoodEvent = () => {
    const newGood = good + 1
    setGood(newGood)
    setAll(newGood + neutral + bad)
  }


  const handleNeutralEvent = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    setAll(good + newNeutral + bad)
  }
  const handleBadEvent = () => {
    const newBad = bad + 1
    setBad(newBad)
    setAll(good + neutral + newBad)
  }

  return (
    <div>
      <Display text = {'give feedback'}/>
      <Button eventHandler = {handleGoodEvent} text = {'good'}/>
      <Button eventHandler = {handleNeutralEvent} text = {'neutral'}/>
      <Button eventHandler = {handleBadEvent} text = {'bad'}/>
      <Display text = {'statistics'}/>
      <Statistics good = {good} bad = {bad} neutral={neutral} all={all}/>
      
    </div>
  )
}

export default App