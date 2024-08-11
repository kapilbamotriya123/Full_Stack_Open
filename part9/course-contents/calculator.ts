type Operation = 'multiply' | 'add' | 'division' ;

export const calculator = (a:number, b:number, op: Operation ): number => {
    switch (op) {
        case 'add':{
            return a + b;
        }
        case 'multiply': {
            return a*b;
        }
        case 'division': {
            if(b === 0 ) {
                throw new Error('can\'t divide by zero ');
            }
            return a / b ;
        }
        default:
            throw new Error('operation is not as expected');
    }
};

try {
    console.log(calculator(4, 2, 'division'));
} catch (error:unknown) {
    let errorMessage = 'something went wrong: ';
    if(error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

console.log(process.argv[2]);