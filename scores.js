const loadScoreBoard = async (scoreboardId) => {
 const response = await fetch(`https://keepthescore.co/api/${scoreboardId}/board/`);
 const tableData = await response.json();
 tableData.rounds.reverse();

 const titleDiv = document.querySelector('div.standings-heading');
 titleDiv.appendChild(document.createTextNode(tableData.board.game_name));

 const table = document.querySelector('table');

 const headRow = table.querySelector('tr.head-row');
 for (let round of tableData.rounds) {
   let roundCell = headRow.appendChild(document.createElement('th'));
   roundCell.appendChild(document.createTextNode(round.comment));
 }
 let totalCell = headRow.appendChild(document.createElement('th'));
 totalCell.appendChild(document.createTextNode('Total'));

 for (let index = 0; index < tableData.players.length; index++) {
   let row = table.insertRow();

   let rankCell = row.insertCell();
   rankCell.className = 'ranking';
   if (index < 3) {
     rankCell.appendChild(document.createTextNode(index+1));
   }

   const player = tableData.players[index];

   let nameCell = row.insertCell();
   nameCell.className = 'team-name';
   nameCell.appendChild(document.createTextNode(player.name));

   for (let roundIndex = 0; roundIndex < tableData.rounds.length; roundIndex++) {
     let scoreCell = row.insertCell();
     let score = tableData.rounds[roundIndex].scores[index];
     if (score > 0) {
       scoreCell.appendChild(document.createTextNode(score));
     }
   }

   let totalCell = row.insertCell();
   totalCell.className = 'total';
   totalCell.appendChild(document.createTextNode(player.score));
 }
};

loadScoreBoard(new URLSearchParams(new URL(window.location.href).search).get('id'));
