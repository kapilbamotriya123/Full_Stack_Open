import { CourseContent } from "../../types"

interface PartProp {
    course: CourseContent
};

const Part = ({course}: PartProp) => {
    switch(course.kind) {
        case "basic" : return (
            <div>
                <h3>
                {course.name}
                </h3>
                <strong>
                    Total exercise count:
                </strong>
                 {course.exerciseCount}
                 <br></br>
                 <strong>
                    Course Description:
                </strong>
                {course.description}
                
            </div>
        );
        case 'group' : return (
            <div>
                <h3>
                {course.name}
                </h3>
                <strong>
                    Total exercise count:
                </strong>
                 {course.exerciseCount}
                <br></br>
                <strong>
                    Group Project Count: 
                </strong>
                {course.groupProjectCount}
            </div>
        );
        case 'background' : return (
            <div>
                <h3>
                {course.name}
                </h3>
                <strong>
                    Total exercise count:
                </strong>
                 {course.exerciseCount}
                 <br></br>
                 <strong>
                    Course Description: 
                </strong> {course.description}
                <br></br>
                <strong>
                    background Material: 
                </strong>
                {course.backgroundMaterial}
            </div>
        );
        case 'special' : return (
            <div>
                <h3>
                    {course.name}
                </h3>
                <strong>Total exerciseCount: </strong> {course.exerciseCount}
                <br/>
                <strong>Course Description: </strong> {course.description}
                <br/>
                <strong>Course Requirements: </strong> {course.requirements.join(', ')}
            </div>
        )
    }


}



export default Part