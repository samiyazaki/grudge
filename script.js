const scoreboard = document.getElementById('scoreboard');

async function fetchScores() {
    try {
        const response = await fetch('http://localhost:3000/scores');
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch scores', error);
        return []; // Return an empty array if fetching fails
    }
}

function updateDOMWithScores(scores) {
    scoreboard.innerHTML = scores
        .map((score) => `
            <tr>
                <td>${score.classroom}</td>
                <td>
                    <span id="group-name-${score._id}">${score.group}</span>
                    <input type="text" id="group-input-${score._id}" value="${score.group}" style="display: none;" />
                </td>
                <td>${score.score}</td>
                <td>
                    <button onclick="incrementScore('${score._id}')">+</button>
                    <button onclick="decrementScore('${score._id}')">-</button>
                </td>
                <td>
                    <button onclick="editGroupName('${score._id}')">Edit</button>
                    <button onclick="saveGroupName('${score._id}')" style="display: none;">Save</button>
                </td>
            </tr>
        `)
        .join('');
}

async function renderScores() {
    const scores = await fetchScores();
    updateDOMWithScores(scores);
}

// ... [rest of the code unchanged]

renderScores();
