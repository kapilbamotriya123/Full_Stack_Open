/*
interface dailyExerciseAndTarget {
    dailyexercise: number[],
    target: number
}
const parseArg = (args: string[]): dailyExerciseAndTarget => {
    if (args.length < 10) { throw new Error('too less args');}
    
    const dailyEx = args.slice(2, -1);
    const target = args[args.length - 1];

    dailyEx.forEach(item => {
        if (isNaN(Number(item))) {
            throw new Error('Invalid exercise data, only number of hours is allowed');
        }
    });

    if (isNaN(Number(target))) {
        throw new Error('Invalid Target, only number of hours allowed');
    }

    return {
        dailyexercise: dailyEx.map(item => Number(item)),
        target: Number(target)
    };
};

*/

export const exCalculator = ( dailyexercise: number[], target:number ): object => {
    

    const totalDays = dailyexercise.length;
    let totalExDays = 0;

    const average = dailyexercise.reduce((sum, item) => {
        if (item !== 0) {
            totalExDays++;
        }
        return item + sum;
    }, 0) / totalDays;

    const targetReached = average >= target;

    let ratingComment = '';

    const rating = (): number => {
        if (targetReached) {
            ratingComment = 'Well Done, Now push limits and set tougher plan';
            return 3;
        } else if (average >= target / 2) {
            ratingComment = 'Ok but improvement is required';
            return 2;
        } else {
            ratingComment = 'Need to get out of comfort ASAP';
            return 1;
        }
    };
    const ratingValue = rating();

    return {
        periodLength: totalDays,
        trainingDays: totalExDays,
        target,
        average,
        success: targetReached,
        rating: ratingValue,
        ratingDescription: ratingComment
    };
};

