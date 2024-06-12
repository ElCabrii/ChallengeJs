
const cases = [...document.getElementsByClassName("case")]; // nodelist -> array
let joueur = document.getElementById("joueur");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let scoreNul = document.getElementById("scoreNul");
let mode = "PvP";

// Obtenez les boutons de mode à partir de votre HTML
let modePvPButton = document.getElementById("modePvP");
let modePvEButton = document.getElementById("modePvE");

// Ajoutez des gestionnaires d'événements aux boutons de mode
modePvPButton.addEventListener("click", function() {
    mode = "PvP";
    resetState(); // Réinitialisez l'état du jeu lorsque le mode change
});
modePvEButton.addEventListener("click", function() {
    mode = "PvE";
    resetState(); // Réinitialisez l'état du jeu lorsque le mode change
});

let state = {
    joueurEnCours: 1,
    scoreJ1: 0,
    scoreJ2: 0,
    matchNul: 0,
    c1: 0, c2: 0, c3: 0, c4: 0, c5: 0, c6: 0, c7: 0, c8: 0, c9: 0
};
const resetState = () => {
    state.joueurEnCours = 1;
    for (let i = 1; i <= 9; i++) {
        state['c' + i] = 0;
    }
    cases.forEach(c => c.textContent = "");
    joueur.textContent = "Joueur 1";
};
const verifierVictoire = () => {
    const conditions = [
        ['c1', 'c2', 'c3'], ['c4', 'c5', 'c6'], ['c7', 'c8', 'c9'],
        ['c1', 'c4', 'c7'], ['c2', 'c5', 'c8'], ['c3', 'c6', 'c9'],
        ['c1', 'c5', 'c9'], ['c3', 'c5', 'c7']
    ];
    for (let condition of conditions) {
        if (state[condition[0]] !== 0 &&
            state[condition[0]] === state[condition[1]] &&
            state[condition[1]] === state[condition[2]]) {
            return true;
        }
    }
    if (Object.keys(state).every(key => state[key] !== 0 || !key.startsWith('c'))) {
        return null; // Match nul
    }
    return false; // Le jeu continue
};
function getAvailableMoves() {
    return Object.keys(state).filter(key => key.startsWith('c') && state[key] === 0);
}
const makeComputerMove = () => {
    let availableMoves = getAvailableMoves();
    if (availableMoves.length > 0) {
        let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        state[move] = 2;
        document.getElementById(move).textContent = "O";
        let result = verifierVictoire();
        if (result !== false) {
            handleGameEnd(result);
        } else {
            state.joueurEnCours = 1; // Retour au joueur 1
            joueur.textContent = "Joueur 1";
        }
    }
};
const handleGameEnd = (result) => {
    if (result === true) {
        alert("Le gagnant est le joueur " + state.joueurEnCours);
        state['scoreJ' + state.joueurEnCours]++;
        updateScores();
    } else if (result === null) {
        alert("Match nul !");
        state.matchNul++;
        scoreNul.textContent = state.matchNul;
    }
    resetState();
};
const jouerCase = (e) => {
    let idCase = e.target.id;
    if (state[idCase] !== 0 || (mode === "PvE" && state.joueurEnCours !== 1)) return;

    state[idCase] = state.joueurEnCours;
    e.target.textContent = state.joueurEnCours === 1 ? "X" : "O";

    let result = verifierVictoire();
    if (result !== false) {
        handleGameEnd(result);
    } else if (mode === "PvP" || state.joueurEnCours === 2) {
        state.joueurEnCours = 3 - state.joueurEnCours; // Alterne entre 1 et 2
        joueur.textContent = "Joueur " + state.joueurEnCours;
    } else if (mode === "PvE" && state.joueurEnCours === 1) {
        state.joueurEnCours = 2;
        joueur.textContent = "Joueur 2";
        makeComputerMove();
    }
};
cases.forEach(el => el.addEventListener("click", jouerCase));
updateScores();
resetState();
