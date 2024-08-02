let notSorted = [
    {
        vote:4
    },
    {
        vote:2
    },
    {
        vote:6
    },
    {
        vote:1
    }
]

const sort = (array) => {
    let sortedArray = [];
    if (array.length === 0) {
        return sortedArray; // Base case: return empty array
    }
    let votes = 0;
    array.forEach(anecdote => {
        if (anecdote.votes > votes) {
            votes = anecdote.votes;
        }
    });
    let an = array.find(an => an.votes === votes);
    sortedArray.push(an);
    array = array.filter(anec => anec !== an);
    return sort(array); // Return the recursive call
};

console.log(sort(notSorted))