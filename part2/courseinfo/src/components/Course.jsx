const Course = ({course}) => {
    const excs = course.parts.map(part=>part.exercises) //list of exercises
    
    return (
      <div>
        <h2>{course.name}</h2>
          {course.parts.map(part=>
            <p key={part.id}>{part.name} {part.exercises}</p>
          )}
          <b>Total of {excs.reduce( (x,y)=> x + y)} exercises</b>
      </div>
  
    )
  }

export default Course