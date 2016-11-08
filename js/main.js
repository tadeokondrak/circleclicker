 if (localStorage.save) {
     var game = JSON.parse(atob(localStorage.save));
 } else {
     var game = {
         clicks: 0,
         upgrades: [0, 0, 0, 0, 0, 0, 0, 0],
         cps: 0,
         upgradePrice: [15, 100, 500, 2000, 7000, 50000, 1000000, 100000000],
         upgradeCps: [0.1, 0.5, 4, 10, 40, 100, 400, 7000]
     };
 }

 function saveGame() {
     localStorage.save = btoa(JSON.stringify(game));
 }

 function gameLoop() {
     game.clicks += game.cps;
     updateView();
     saveGame();
 }

 function buyUpgrade(x) {
     if (game.clicks >= game.upgradePrice[x]) {
         game.clicks -= game.upgradePrice[x];
         game.upgradePrice[x] = Math.ceil(game.upgradePrice[x] * 1.15);
         game.upgrades[x] += 1;
         game.cps += game.upgradeCps[x];
     }
 }
 var gameLoopInterval = setInterval(gameLoop, 1000);

 function updateView() {
     $("#count").html(Math.round(game.clicks).toLocaleString());
     $("#cps").html((Math.round(game.cps * 10) / 10).toFixed(1).toLocaleString());
     $("#price0").html(game.upgradePrice[0].toLocaleString());
     $("#price1").html(game.upgradePrice[1].toLocaleString());
     $("#price2").html(game.upgradePrice[2].toLocaleString());
     $("#price3").html(game.upgradePrice[3].toLocaleString());
     $("#price4").html(game.upgradePrice[4].toLocaleString());
     $("#price5").html(game.upgradePrice[5].toLocaleString());
     $("#price6").html(game.upgradePrice[6].toLocaleString());
     $("#price7").html(game.upgradePrice[7].toLocaleString());
     $("#qty0").html(game.upgrades[0].toLocaleString());
     $("#qty1").html(game.upgrades[1].toLocaleString());
     $("#qty2").html(game.upgrades[2].toLocaleString());
     $("#qty3").html(game.upgrades[3].toLocaleString());
     $("#qty4").html(game.upgrades[4].toLocaleString());
     $("#qty5").html(game.upgrades[5].toLocaleString());
     $("#qty6").html(game.upgrades[6].toLocaleString());
     $("#qty7").html(game.upgrades[7].toLocaleString());
 }
 $(function() {
     $("#circle").click(function() {
      if(game.cps>4){
         game.clicks += game.cps / 4;
      }
      else{
         game.clicks += 1;
      }
         updateView();
     });
 });

 function exportSave() {
     prompt('This is your save. Keep it.', btoa(JSON.stringify(game)));
 }

 function importSave() {
     game = JSON.parse(atob(prompt('Enter your save here. Your previous save will not be saved.')));
     saveGame();
     location.reload();
 }

 function wipeSave() {
     if (confirm('Are you sure you would like to delete EVERYTHING?')) {
         clearInterval(gameLoopInterval);
         localStorage.save = "";
         alert('Deleted.');
         location.reload();
     } else {
         alert('Cancelled.');
     }
 }
