interface CourseBase {
    name:string;
    exerciseCount:number;
}

interface CourseBaseAndDesc extends CourseBase {
    description: string;
}

interface CoursePartBasic extends CourseBaseAndDesc{
    kind:'basic';
}

interface CoursePartGroup extends CourseBase {
    groupProjectCount: number;
    kind: 'group'
}

interface CoursePartBackground extends CourseBaseAndDesc {
    
    backgroundMaterial: string;
    kind: 'background'
}

interface CourseSpecial extends CourseBaseAndDesc {
    requirements: string[];
    kind: 'special'
};

export type CourseContent = CoursePartBasic | CoursePartGroup | CoursePartBackground | CourseSpecial ;

