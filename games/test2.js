let scoreData = { total: 84, streak: 5 };
let penalty = 15;
scoreData.total = Math.max(0, scoreData.total - penalty);
scoreData.streak = 0;
console.log(scoreData);

scoreData = { total: "84", streak: 5 };
scoreData.total = Math.max(0, scoreData.total - penalty);
scoreData.streak = 0;
console.log(scoreData);
