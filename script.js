// crear objetos con información relacionada a cada jugador
const first_player = { screen: document.querySelector(".first-player"), choice: null, shift: false, score: 0 }
const second_player = { screen: document.querySelector(".second-player"), choice: null, shift: false, score: 0 }

let current_user = first_player;

// datos generales del juego

const parser = new DOMParser();
const game_options = document.querySelectorAll(".option");

//iconos del juego como valores para setearlo al html
const VALUES = [
    { value: 1, icon: svgElement(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M15 6a3 3 0 0 0-2.531 1.406A2.95 2.95 0 0 0 11 7c-1.645 0-3 1.355-3 3v3.656l-2.094 2.688c-1.277 1.652-1.191 4.023.188 5.593l2.375 2.688A6.98 6.98 0 0 0 13.719 27H19c3.855 0 7-3.145 7-7v-9c0-1.645-1.355-3-3-3c-.535 0-1.031.156-1.469.406A3 3 0 0 0 19 7c-.535 0-1.031.156-1.469.406A3 3 0 0 0 15 6m0 2c.566 0 1 .434 1 1v3h2v-2c0-.566.434-1 1-1s1 .434 1 1v2h2v-1c0-.566.434-1 1-1s1 .434 1 1v9c0 2.773-2.227 5-5 5h-5.281a4.97 4.97 0 0 1-3.75-1.688l-2.375-2.718a2.34 2.34 0 0 1-.094-3l.5-.657V18h2v-8c0-.566.434-1 1-1s1 .434 1 1v2h2V9c0-.566.434-1 1-1"/></svg>`) },
    { value: 2, icon: svgElement(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2c-1.383 0-2.531.969-2.875 2.25C12.773 4.105 12.402 4 12 4c-1.645 0-3 1.355-3 3v10.75l-.875-.875a3.023 3.023 0 0 0-4.25 0a3.023 3.023 0 0 0 0 4.25l6.781 6.781C11.832 29.078 13.457 30 15.375 30H20c3.855 0 7-3.145 7-7V11c0-1.645-1.355-3-3-3a3 3 0 0 0-1 .188V7c0-1.645-1.355-3-3-3c-.402 0-.773.105-1.125.25C18.531 2.969 17.383 2 16 2m0 2c.566 0 1 .434 1 1v10h2V7c0-.566.434-1 1-1s1 .434 1 1v8h2v-4c0-.566.434-1 1-1s1 .434 1 1v12c0 2.773-2.227 5-5 5h-4.625c-1.273 0-2.367-.621-3.281-1.531l-6.813-6.75a1.014 1.014 0 0 1 0-1.438a1.014 1.014 0 0 1 1.438 0l2.562 2.594L11 22.594V7c0-.566.434-1 1-1s1 .434 1 1v8h2V5c0-.566.434-1 1-1"/></svg>`) },
    { value: 3, icon: svgElement(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M15 2c-1.645 0-3 1.355-3 3v1.531l-.125-.406c-.477-1.574-2.176-2.477-3.75-2s-2.477 2.176-2 3.75l2.594 8.438c-.188.074-.39.16-.594.28c-.836.5-1.781 1.512-2.063 3.126c-.21 1.195.02 2.246.188 2.812v.032l.781 2.5A7 7 0 0 0 13.72 30H19c3.855 0 7-3.145 7-7V12.875q-.013-.047-.031-.094c-.09-1.101-.758-2.129-1.844-2.562c-.754-.301-1.547-.258-2.25.031a3 3 0 0 0-1.531-1.406A3 3 0 0 0 18 8.906V5c0-1.645-1.355-3-3-3m0 2c.566 0 1 .434 1 1v6.594l-1.031 2.625a3.2 3.2 0 0 0-.219 1.156l-4.094.531l-2.594-8.625a.983.983 0 0 1 .657-1.25c.539-.164 1.086.149 1.25.688l2.062 6.843l1.125-.343H14V5c0-.566.434-1 1-1m4.188 6.625c.128-.004.277.012.406.063A1 1 0 0 1 20.156 12l-1.062 2.656v.031l-.407 1.032c-.019.054-.066.078-.093.125a3.05 3.05 0 0 0-1.813-.656c.012-.075 0-.145.032-.22l1.5-3.718c.156-.395.488-.617.875-.625M22.968 12c.134 0 .274.012.407.063a.975.975 0 0 1 .625.906V13c0 .121-.016.254-.063.375l-1.125 2.781a1 1 0 0 1-1.312.563c-.523-.211-.742-.79-.531-1.313l1.062-2.656c.016-.04.016-.086.032-.125a1.02 1.02 0 0 1 .53-.563a.9.9 0 0 1 .377-.062zM16.5 17.156a.95.95 0 0 1 1.156.719c.078.324.035.488-.062.656c-.098.168-.305.375-.75.532L12 20.313a1 1 0 0 0-.625 1.437l.906 1.656a.997.997 0 0 0 1.36.39a.997.997 0 0 0 .39-1.358l-.281-.5l3.688-.97q.046-.012.093-.03c.774-.27 1.395-.731 1.782-1.375a2.83 2.83 0 0 0 .375-1.75c.292.316.667.578 1.093.75A2.97 2.97 0 0 0 24 17.905V23c0 2.773-2.227 5-5 5h-5.281c-2.2 0-4.133-1.43-4.781-3.531l-.75-2.5c-.083-.27-.247-1.215-.126-1.907c.188-1.074.657-1.488 1.094-1.75c.438-.261.75-.28.75-.28h.063l6.437-.845q.048-.012.094-.03z"/></svg>`) }
]


// añadir listeners a los botones de la UI y relacionarlo con el html
game_options.forEach((option) => {
    option.addEventListener("click", (event) => {

        // actualizar los datos del jugador actual
        const value = event.target.dataset.option;

        current_user.choice = choice(Number(value));
        current_user.shift = true;
        checkScreen(current_user.screen);
        current_user.screen.appendChild(showIcon(value).icon.cloneNode(true));

        // alternar el puntero current_user
        current_user = current_user === first_player ? second_player : first_player;

        // verificar el ganador cuando ambos objetos hayan jugado su turno
        if (first_player.shift && second_player.shift) {
            checkWinner(first_player.choice, second_player.choice);
            const players = [first_player, second_player];
            players.forEach((player) => resetPlayersInformation(player));
        }
    })
})

function resetPlayersInformation(player) {
    player.choice = null
    player.shift = false
}

function showIcon(choice) {
    return VALUES.find(option => option.value.toString() === choice);
}

function checkScreen(screen) {
    if (screen.hasChildNodes()) {
        screen.innerHTML = "";
    }
}

function svgElement(string_svg) {
    return parser.parseFromString(string_svg, "image/svg+xml").documentElement;
}

const choice = (random) => {
    if (random === 1) return "rock";
    if (random === 2) return "paper";
    if (random === 3) return "scissors";
}

function getComputerChoice() {
    const random = Math.floor(Math.random() * 3) + 1
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

// determinar el ganador de la ronda
function checkWinner(first_player_choice, second_player_choice) {
    console.log(first_player_choice, second_player_choice);
    const result = playRound(first_player_choice, second_player_choice);

    if (result === "human") {
        console.log("first player gana la ronda");
        first_player.score += 1;
    } else if (result === "computer") {
        console.log("second player gana la ronda");
        second_player.score += 1;
    } else {
        console.log("Empate Tecnico");
    }
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