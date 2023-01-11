const loadScoreBoard = async (scoreboardId) => {
 if (!scoreboardId) return;
 
 const scoreUrl = `https://keepthescore.co/api/${scoreboardId}/board/`;
 const loadingDiv = document.querySelector('div.loading-indicator');
 if (loadingDiv) loadingDiv.firstChild.data = 'Loading scores from #{scoreUrl}...';

 const response = await fetch(scoreUrl);
 const tableData = await response.json();
 tableData.rounds.reverse();

 const standingsDiv = document.createElement("div");
 standingsDiv.className='standings';

 const titleDiv = document.createElement("div");
 titleDiv.className='standings-heading';
 titleDiv.appendChild(document.createTextNode(tableData.board.game_name));
 standingsDiv.append(titleDiv);

 const table = document.createElement("table");
 standingsDiv.append(table);
 const tbody = document.createElement("tbody");
 table.append(tbody);
 const headRow = document.createElement("tr");
 headRow.className='head-row';
 tbody.append(headRow);
 const rankingHead = document.createElement("th");
 rankingHead.className='ranking';
 headRow.append(rankingHead);
 const nameHead = document.createElement("th");
 nameHead.appendChild(document.createTextNode('Team Name'));
 headRow.append(nameHead);

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
   
   document.body.append(standingsDiv);
   if (loadingDiv) loadingDiv.remove();
 }
};

loadScoreBoard(new URLSearchParams(new URL(window.location.href).search).get('id'));
