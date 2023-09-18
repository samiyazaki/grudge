const scoreboard = document.getElementById('scoreboard');

const scores = [
    { classroom: 'Class 1', group: 'Group A', score: 0 },
    { classroom: 'Class 1', group: 'Group B', score: 0 },
    { classroom: 'Class 1', group: 'Group C', score: 0 },
    { classroom: 'Class 1', group: 'Group D', score: 0 },
    { classroom: 'Class 1', group: 'Group E', score: 0 },
    { classroom: 'Class 1', group: 'Group F', score: 0 },
];

function renderScores() {
    scoreboard.innerHTML = scores
        .map((score, index) => `
            <tr>
                <td>${score.classroom}</td>
                <td>${score.group}</td>
                <td>${score.score}</td>
                <td>
                    <button onclick="incrementScore(${index})">+</button>
                    <button onclick="decrementScore(${index})">-</button>
                </td>
            </tr>
        `)
        .join('');
}

function incrementScore(index) {
    scores[index].score += 1;
    renderScores();
}

function decrementScore(index) {
    scores[index].score -= 1;
    renderScores();
}

renderScores();
