const loadScoreBoard = async (scoreboardId) => {
 if (!scoreboardId) return;
 
 const leaderBoardUrl = `https://keepthescore.com/api/${scoreboardId}/board/`;
 const loadingDiv = document.querySelector('div.loading');
 if (loadingDiv) loadingDiv.firstChild.data = `Loading scores from ${leaderBoardUrl}...`;

 const response = await fetch(leaderBoardUrl);
 const tableData = await response.json();
 tableData.rounds.reverse();

 const scoresheetDiv = document.createElement("div");
 scoresheetDiv.className='scoresheet';

 const titleDiv = document.createElement("div");
 titleDiv.className='scoresheet-heading';
 scoresheetDiv.append(titleDiv);

 const table = document.createElement("table");
 scoresheetDiv.append(table);
 const tbody = document.createElement("tbody");
 table.append(tbody);
 const headRow = document.createElement("tr");
 headRow.className='head-row';
 tbody.append(headRow);

 const columnTitles = ["Chugs", "Team Name", "R1", "R2", "R3", "R4", "Subtotal", "R5", "Final"];
 for (let columnTitle of columnTitles) {
   const columnHead = document.createElement("th");
   columnHead.appendChild(document.createTextNode(columnTitle));
   headRow.append(columnHead);
 }

 // Map of player names, limited to the top X and sorted.
 const playerNames = tableData.players.map(p => p.name).slice(0,15).sort();
 playerNames.push(...["","","","","","","","","","",""]);
 
 for (let playerName of playerNames) {
   let row = table.insertRow();
   
   // Chugs cell
   row.insertCell();

   let nameCell = row.insertCell();
   nameCell.className = 'team-name';
   nameCell.appendChild(document.createTextNode(playerName));

   row.insertCell();
   row.insertCell();
   row.insertCell();
   row.insertCell();
   row.insertCell();
   row.insertCell();
   row.insertCell();
 }

 document.body.append(scoresheetDiv);
 if (loadingDiv) loadingDiv.remove();
};

loadScoreBoard(new URLSearchParams(new URL(window.location.href).search).get('id'));
