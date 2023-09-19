const scoreboard = document.getElementById('scoreboard');

const scores = [
    { classroom: 'Class 1', group: 'Group A', score: 0 },
    { classroom: 'Class 1', group: 'Group B', score: 0 },
    { classroom: 'Class 1', group: 'Group C', score: 0 },
    { classroom: 'Class 1', group: 'Group D', score: 0 },
    { classroom: 'Class 1', group: 'Group E', score: 0 },
    { classroom: 'Class 1', group: 'Group F', score: 0 },
];

async function renderScores() {
    try {
      const res = await fetch('http://localhost:3000/scores');
      const scores = await res.json();
      
      scoreboard.innerHTML = scores
        .map((score, index) => `
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
    } catch (err) {
      console.error('Could not fetch scores', err);
    }
  }
  
  function editGroupName(id) {
    document.getElementById(`group-name-${id}`).style.display = 'none';
    document.getElementById(`group-input-${id}`).style.display = 'block';
    document.querySelector(`[onclick="editGroupName('${id}')"]`).style.display = 'none';
    document.querySelector(`[onclick="saveGroupName('${id}')"]`).style.display = 'block';
  }
  
  async function saveGroupName(id) {
    try {
      const newName = document.getElementById(`group-input-${id}`).value;
  
      const res = await fetch(`http://localhost:3000/scores/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ group: newName }),
      });
      
      const updatedScore = await res.json();
      
      document.getElementById(`group-name-${id}`).textContent = updatedScore.group;
      document.getElementById(`group-name-${id}`).style.display = 'block';
      document.getElementById(`group-input-${id}`).style.display = 'none';
      document.querySelector(`[onclick="editGroupName('${id}')"]`).style.display = 'block';
      document.querySelector(`[onclick="saveGroupName('${id}')"]`).style.display = 'none';
      
    } catch (err) {
      console.error('Could not save group name', err);
    }
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
