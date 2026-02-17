const choice = (random) => {
    if (random === 1) return "rock";
    if (random === 2) return "paper";
    if (random === 3) return "scissors";
}

function getComputerChoice() {
    const random = Math.floor(Math.random() * 3) + 1 // solo genera valores entre 1 y 3
    return choice(random);
}

function getHumanChoice() {
    let random = parseInt(prompt('(1: rock) (2: paper) (3:scissors): '));

    if (random < 1 || random > 3) {
        console.log("Seleccione una opcion valida");
        return;
    }

    return choice(random);
}

function playRound(human_choice, computer_choice) {
    const human = human_choice.toLowerCase();
    const computer = computer_choice.toLowerCase();

    if (human === computer) return 'tie'; // empate tecnico

    if (human === "paper" && computer === "rock") return "human";
    if (human === "scissors" && computer === "paper") return "human";
    if (human === "rock" && computer === "scissors") return "human";

    return 'computer'; // ningun escenario posible donde el humano pudo ganar se cumplio
}

function checkWinner(human_choice, computer_choice, human_score, computer_score) {
    const result = playRound(human_choice, computer_choice);
    console.log(result);

    if (result === "human") {
        console.log("Humano gana la ronda");
        human_score += 1;
    } else if (result === "computer") {
        console.log("Computadora gana la ronda");
        computer_score += 1;
    } else {
        console.log("Empate Tecnico");
    }

    return [human_score, computer_score];
}

function checkScore(human_score, computer_score) {
    console.log("Humano: " + human_score);
    console.log("Computadora: " + computer_score);

}

function playGame() {
    let human_score = 0;
    let computer_score = 0;

    for (let idx = 0; idx < 5; idx++) {
        const human = getHumanChoice();
        const computer = getComputerChoice();
        [human_score, computer_score] = checkWinner(human, computer, human_score, computer_score);
        checkScore(human_score, computer_score);
    }

    if (human_score === computer_score) {
        console.log("Empate");
        return;
    }

    if (human_score > computer_score) {
        console.log('Humano Gano');
    } else {
        console.log('Computadora Gano');
    }
}

playGame();