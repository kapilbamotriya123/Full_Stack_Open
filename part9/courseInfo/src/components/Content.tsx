import { CourseContent } from "../../types"
import Part from "./Part"

// interface CourseInfo {
//     name: string,
//     exerciseCount: number
// };


const Content = ({courseParts} : {courseParts: CourseContent[]}) => {

console.log()
    return (
        <div>
            <ul>
                {courseParts.map(part => (
                    <Part course = {part} />
                ))}
            </ul>
        </div>
    )
}
export default Content