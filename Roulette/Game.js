function game() {
    initgame()
    Play()
}
function initgame() {
    console.log("Bienvenue au jeu de la roulette !");
    console.log("Vous avez 100€");
    console.log("Le jeu de la roulette consiste a miser sur un nombre entre 0 et 36");
    console.log("Vous pouvez miser sur plusieurs choses, a vous de choisir !");
    console.log("Une fois que vous avez choisi, vous pouvez miser une somme d'argent");
    console.log("Une fois que vous avez misé, la roulette tourne et un nombre est tiré");
    console.log("Si vous avez perdu, vous perdez votre mise !");
    console.log("Si vous avez gagné, vous gagnez de l'argent !");
    console.log("Attention ! Vous ne pouvez pas miser plus que ce que vous avez dans votre portemonnaie !");
    console.log("Si vous n'avez plus d'argent, vous avez perdu !");
    console.log("Vous pouvez quitter le jeu a tout moment en tapant 'exit'");
    console.log("Bonne chance !");
}
function Play(){
    checkWallet()
    askUserwhatToBet();
}
function spinTheWheel(betType, betAmount) {
    console.log("La roulette tourne et le numéro est : " + ball);
    switch (betType) {
        case "1":
            CheckNumber(ball, betAmount);
            break;
        case "2":
            CheckColor(ball, betAmount);
            break;
        case "3":
            CheckParity(ball, betAmount);
            break;
        case "4":
            CheckLowHigh(ball, betAmount);
            break;
        case "5":
            CheckColumn(ball, betAmount);
            break;
        case "6":
            CheckDozen(ball, betAmount);
            break;
        case "7":
            CheckRow(ball, betAmount);
            break;
    }
}
function checkWallet(){
    console.log("Vous avez : " + wallet + "€");
    if (wallet <= 0) {
        console.log("Vous n'avez plus d'argent !");
        console.log("Vous avez perdu !");
        askforNewGame();
    }
    else {
        askUserwhatToBet();
    }

}
function askforNewGame(){
    let answer = readline.question("Voulez vous recommencer une partie ? (oui ou non) ");
    if (answer === "oui") {
        game();
    } else {
        endgame();
    }

}
function endgame(){
    console.log("Vous avez : " + wallet + "€");
    console.log("A bientôt !");
    process.exit();
}
// Contenu de Game.js
function startGame() {
    console.log("Début du jeu...");
}

module.exports = { startGame };
