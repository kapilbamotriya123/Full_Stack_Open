
const App = ( ) => {
  const Hello = ({name}: {name:string}) => {
    return (
      `Hello, ${name}`
    )
  }
  return (
    <div>
      < Hello name = 'typescript' />
    </div>
  )
}

export default App