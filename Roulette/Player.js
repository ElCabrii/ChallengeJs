// Le Portemonnaie du joueur
let wallet = 100;
function askUserwhatToBet(){
    console.log("Sur quoi voulez vous miser ?");
    console.log("1. Un nombre entre 0 et 36");
    console.log("2. La couleur du nombre (rouge ou noir)");
    console.log("3. La parité du nombre (pair ou impair)");
    console.log("4. La moitié du nombre (1-18 ou 19-36)");
    console.log("5. La colonne du nombre (1, 2 ou 3)");
    console.log("6. La douzaine du nombre (1, 2 ou 3)");
    console.log("7. La ligne du nombre (1, 2 ou 3)");
    console.log("8. Lancer la roulette");
    console.log("exit. Quitter le jeu");

    let choice = readline.question("Votre choix : ");
    switch (choice) {
        case "1":
            askUserNumber();
            break;
        case "2":
            askUserColor();
            break;
        case "3":
            askUserParity();
            break;
        case "4":
            askUserHalf();
            break;
        case "5":
            askUserColumn();
            break;
        case "6":
            askUserDozen();
            break;
        case "7":
            askUserLine();
            break;
        case "8":
            spinTheWheel();
            break;
        case "exit":
            console.log("A bientôt !");
            process.exit();
            break;

        default:
            console.log("Choix invalide");
            askUserwhatToBet();
            break;
    }
}
function askUserNumber(){
    let userNumber = readline.question("Sur quel nombre voulez vous miser ? ");
    if (userNumber < 0 || userNumber > 36) {
        console.log("Nombre invalide");
        askUserNumber();
    }
    else {
        askUserAmount(userNumber);
    }
}
function askUserColor(){
    let userColor = readline.question("Sur quelle couleur voulez vous miser ? (rouge ou noir) ");
    if (userColor !== "rouge" && userColor !== "noir") {
        console.log("Couleur invalide");
        askUserColor();
    }
    else {
        askUserAmount(userColor);
    }
}
function askUserParity(){
    let userParity = readline.question("Sur quelle parité voulez vous miser ? (pair ou impair) ");
    if (userParity !== "pair" && userParity !== "impair") {
        console.log("Parité invalide");
        askUserParity();
    }
    else {
        askUserAmount(userParity);
    }
}
function askUserHalf(){
    let userHalf = readline.question("Sur quelle moitié voulez vous miser ? (1-18 ou 19-36) ");
    if (userHalf !== "1-18" && userHalf !== "19-36") {
        console.log("Moitié invalide");
        askUserHalf();
    }
    else {
        askUserAmount(userHalf);
    }
}
function askUserColumn(){
    let userColumn = readline.question("Sur quelle colonne voulez vous miser ? (1, 2 ou 3) ");
    if (userColumn !== "1" && userColumn !== "2" && userColumn !== "3") {
        console.log("Colonne invalide");
        askUserColumn();
    }
    else {
        askUserAmount(userColumn);
    }
}
function askUserDozen(){
    let userDozen = readline.question("Sur quelle douzaine voulez vous miser ? (1, 2 ou 3) ");
    if (userDozen !== "1" && userDozen !== "2" && userDozen !== "3") {
        console.log("Douzaine invalide");
        askUserDozen();
    }
    else {
        askUserAmount(userDozen);
    }
}
function askUserLine(){
    let userLine = readline.question("Sur quelle ligne voulez vous miser ? (1, 2 ou 3) ");
    if (userLine !== "1" && userLine !== "2" && userLine !== "3") {
        console.log("Ligne invalide");
        askUserLine();
    }
    else {
        askUserAmount(userLine);
    }
}
function askUserAmount(betType){
    let betAmount = readline.question("Combien voulez vous miser ? ");
    if (betAmount > wallet) {
        console.log("Vous ne pouvez pas miser plus que ce que vous avez dans votre portemonnaie");
        askUserAmount(betType);
    }
    else {
        askUserwhatToBet();
    }
}
// Contenu de Player.js
function createPlayer() {
    console.log("Création du joueur...");
}

module.exports = { createPlayer };
