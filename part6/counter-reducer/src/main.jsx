import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CounterContextProvider } from './components/CounterContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <CounterContextProvider>
   <App />
  </CounterContextProvider>
)
