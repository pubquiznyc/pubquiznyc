const loadScoreBoard = async (scoreboardId) => {
 if (!scoreboardId) return;
 
 const leaderBoardUrl = `https://keepthescore.com/api/${scoreboardId}/board/`;
 const loadingDiv = document.querySelector('div.loading');
 if (loadingDiv) loadingDiv.firstChild.data = `Loading scores from ${leaderBoardUrl}...`;

 const scoresUrl = `https://pubquiznyc.github.io/pubquiznyc/scores?id=${scoreboardId}`;
 const scoresheetUrl = `https://pubquiznyc.github.io/pubquiznyc/scoresheet?id=${scoreboardId}`;

 const response = await fetch(leaderBoardUrl);
 const tableData = await response.json();
 tableData.rounds.reverse();

 const standingsDiv = document.createElement("div");
 standingsDiv.className='standings';

 const titleDiv = document.createElement("div");
 titleDiv.className='standings-heading';
 titleDiv.appendChild(document.createTextNode(tableData.board.appearance.title));
 titleDiv.onclick = () => {window.open(scoresUrl);}
 standingsDiv.append(titleDiv);

 const table = document.createElement("table");
 standingsDiv.append(table);
 const tbody = document.createElement("tbody");
 table.append(tbody);
 const headRow = document.createElement("tr");
 headRow.className='head-row';
 headRow.onclick = () => {window.open(scoresheetUrl);}
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

 const totalCell = headRow.appendChild(document.createElement('th'));
 totalCell.appendChild(document.createTextNode('Total'));

 const weekCell = headRow.appendChild(document.createElement('th'));
 weekCell.className='printonly';
 weekCell.appendChild(document.createTextNode('Week'));
 const monthCell = headRow.appendChild(document.createElement('th'));
 monthCell.className='printonly';
 monthCell.appendChild(document.createTextNode('Month'));

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

   let weekCell = row.insertCell();
   weekCell.className = 'printonly';
   weekCell.innerHTML = '&nbsp;&nbsp;&nbsp;'
   let monthCell = row.insertCell();
   monthCell.className = 'printonly total';
   monthCell.innerHTML = '&nbsp;&nbsp;&nbsp;'
 }

 document.body.append(standingsDiv);
 if (loadingDiv) loadingDiv.remove();
};

loadScoreBoard(new URLSearchParams(new URL(window.location.href).search).get('id'));
