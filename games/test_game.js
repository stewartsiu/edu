const fs = require('fs');

// We'll mock the necessary DOM and just extract the math
let scoreData = { total: 100, streak: 0, level: 1 };

let puzzle = {
    prob: 0.8,
    trope: { multiplier: 1 },
    total: 4,
    ones: 3,
    target: 'a',
    a: false // Truth is OFF, but prob of ON is 0.8
};

function submit(guessValue) {
    const guessBool = guessValue === 1;
    const rationalBool = puzzle.prob > 0.5;
    const isRational = guessBool === rationalBool;
    const isCorrect = guessBool === puzzle[puzzle.target];

    let p_chosen = guessBool ? puzzle.prob : (1 - puzzle.prob);
    let levelMult = 1;
    let diffMult = puzzle.trope.multiplier * levelMult;

    let reward = Math.round(10 * p_chosen * diffMult);
    let penalty = Math.round(10 * (1 - p_chosen) * diffMult);

    let onesCount = guessBool ? puzzle.ones : puzzle.total - puzzle.ones;

    let msg = ``;

    if (isCorrect) {
        msg += `Correct +${reward}`;
        scoreData.total += reward;
    } else {
        msg += `Wrong -${penalty}`;
        // this is exactly from the code
        scoreData.total = Math.max(0, scoreData.total - penalty);
    }
    
    console.log(`Guess: ${guessValue}, IsCorrect: ${isCorrect}, Msg: ${msg}, Score is now: ${scoreData.total}`);
}

submit(0); // Guess OFF (prob = 0.2), getting it Right! wait, a = false, so this is correct
scoreData.total = 100;
submit(1); // Guess ON (prob = 0.8), getting it Wrong!

puzzle.a = true; // Truth is ON
scoreData.total = 100;
submit(1); // Guess ON (prob 0.8, Right)
scoreData.total = 100;
submit(0); // Guess OFF (prob 0.2, Wrong)

