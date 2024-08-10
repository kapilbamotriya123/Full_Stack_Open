interface MultiplyValues {
    value1: number;
    value2: number;
}

const parseArg = (args: String[]):MultiplyValues => {
    if(args.length < 4) {throw new Error('not enough arguments')}
    if(args.length > 4) { throw new Error('too many arguments')}

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    } else{
        throw new Error('Provided Values must be numbers');
    }
}

const multiplicator = (a: number, b:number, printText: String) => {
    console.log(printText, a*b);
}

try {
    const {value1, value2} = parseArg(process.argv);
    multiplicator(value1, value2, `the multiplication of ${value1} and ${value2} is: ` );
} catch(error:unknown) {
    let errorMessage = 'something went wrong: ';
    if(error instanceof Error) {
        errorMessage += error.message
    }
    console.log(errorMessage)
}