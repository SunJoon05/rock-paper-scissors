const parser = new DOMParser();
const game_options = document.querySelectorAll(".option");

const fight_svg = svgElement(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="none" stroke="#b0b0b0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6m-3 3l4 4m-1 1l2-2M14.5 6.5L18 3h3v3l-3.5 3.5M5 14l4 4m-2-1l-3 3m-1-1l2 2" />
</svg>
`)

const ICONS = [
    svgElement(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="none" stroke="#17d280" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 6l4 6l5-4l-2 10H5L3 8l5 4z" />
</svg>`), svgElement(
        `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
	<path d="M0 0h48v48H0z" fill="none" />
	<ellipse cx="16.35" cy="31.904" fill="none" stroke="#161275" stroke-linecap="round" stroke-linejoin="round" rx="9.983" ry="3.342" transform="rotate(-14.058 16.35 31.905)" />
	<path fill="none" stroke="#161275" stroke-linecap="round" stroke-linejoin="round" d="M20.498 19.095c1.906.35 3.132.786 3.426 1.958l2.11 8.423m-19.38-6.915c-1.515 1.207-2.392 2.17-2.099 3.342l2.11 8.423m2.9-13.91c1.08-.492 2.296-.916 3.597-1.242s2.573-.525 3.757-.6M7.438 32.503c1.891.601 5.268.49 8.954-.433s6.716-2.416 8.1-3.838M9.565 20.416l1.235 4.93c-1.189.469-2.224 1-3.063 1.535l-1.082-4.32m13.843-3.466l1.082 4.32a18 18 0 0 0-3.425.09l-1.235-4.93m8.42 8.12c1.63.8 3.8 1.476 6.23 1.9c5.439.945 10.097.241 10.415-1.582c.097-.569-.24-1.176-.906-1.765c-1.485-1.32-4.62-2.584-8.361-3.24c-3.472-.607-6.626-.53-8.535.077" />
	<path fill="none" stroke="#161275" stroke-linecap="round" stroke-linejoin="round" d="M41.135 15.276c1.6 1.093 2.544 1.99 2.337 3.18l-1.49 8.554M30.606 12.047c1.187-.011 2.471.095 3.792.325s2.565.564 3.678.976m-15.108 6.5l.839-4.822c.202-1.186 1.398-1.707 3.269-2.199m-2.749 9.847c1.64 1.157 4.475 2.218 7.793 2.796c3.742.646 7.117.511 8.959-.221M30.606 12.048l-.872 5.006a18 18 0 0 0-3.422.161l.764-4.388m14.059 2.449l-.764 4.388a18 18 0 0 0-3.167-1.308l.872-5.008" />
</svg>


    `
    ), svgElement(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="none" stroke="#b0b0b0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 18H5L3.135 8.673a.25.25 0 0 1 .4-.244L8 12l1.6-2.4m1.596-2.394L12 6l4 6l4.464-3.571a.25.25 0 0 1 .401.244l-1.363 6.818M3 3l18 18" />
</svg>
    `)
]

const VALUES = [
    { value: 1, icon: svgElement(`<svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 32 32"><path fill="currentColor" d="M15 6a3 3 0 0 0-2.531 1.406A2.95 2.95 0 0 0 11 7c-1.645 0-3 1.355-3 3v3.656l-2.094 2.688c-1.277 1.652-1.191 4.023.188 5.593l2.375 2.688A6.98 6.98 0 0 0 13.719 27H19c3.855 0 7-3.145 7-7v-9c0-1.645-1.355-3-3-3c-.535 0-1.031.156-1.469.406A3 3 0 0 0 19 7c-.535 0-1.031.156-1.469.406A3 3 0 0 0 15 6m0 2c.566 0 1 .434 1 1v3h2v-2c0-.566.434-1 1-1s1 .434 1 1v2h2v-1c0-.566.434-1 1-1s1 .434 1 1v9c0 2.773-2.227 5-5 5h-5.281a4.97 4.97 0 0 1-3.75-1.688l-2.375-2.718a2.34 2.34 0 0 1-.094-3l.5-.657V18h2v-8c0-.566.434-1 1-1s1 .434 1 1v2h2V9c0-.566.434-1 1-1"/></svg>`) },
    { value: 2, icon: svgElement(`<svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2c-1.383 0-2.531.969-2.875 2.25C12.773 4.105 12.402 4 12 4c-1.645 0-3 1.355-3 3v10.75l-.875-.875a3.023 3.023 0 0 0-4.25 0a3.023 3.023 0 0 0 0 4.25l6.781 6.781C11.832 29.078 13.457 30 15.375 30H20c3.855 0 7-3.145 7-7V11c0-1.645-1.355-3-3-3a3 3 0 0 0-1 .188V7c0-1.645-1.355-3-3-3c-.402 0-.773.105-1.125.25C18.531 2.969 17.383 2 16 2m0 2c.566 0 1 .434 1 1v10h2V7c0-.566.434-1 1-1s1 .434 1 1v8h2v-4c0-.566.434-1 1-1s1 .434 1 1v12c0 2.773-2.227 5-5 5h-4.625c-1.273 0-2.367-.621-3.281-1.531l-6.813-6.75a1.014 1.014 0 0 1 0-1.438a1.014 1.014 0 0 1 1.438 0l2.562 2.594L11 22.594V7c0-.566.434-1 1-1s1 .434 1 1v8h2V5c0-.566.434-1 1-1"/></svg>`) },
    { value: 3, icon: svgElement(`<svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 32 32"><path fill="currentColor" d="M15 2c-1.645 0-3 1.355-3 3v1.531l-.125-.406c-.477-1.574-2.176-2.477-3.75-2s-2.477 2.176-2 3.75l2.594 8.438c-.188.074-.39.16-.594.28c-.836.5-1.781 1.512-2.063 3.126c-.21 1.195.02 2.246.188 2.812v.032l.781 2.5A7 7 0 0 0 13.72 30H19c3.855 0 7-3.145 7-7V12.875q-.013-.047-.031-.094c-.09-1.101-.758-2.129-1.844-2.562c-.754-.301-1.547-.258-2.25.031a3 3 0 0 0-1.531-1.406A3 3 0 0 0 18 8.906V5c0-1.645-1.355-3-3-3m0 2c.566 0 1 .434 1 1v6.594l-1.031 2.625a3.2 3.2 0 0 0-.219 1.156l-4.094.531l-2.594-8.625a.983.983 0 0 1 .657-1.25c.539-.164 1.086.149 1.25.688l2.062 6.843l1.125-.343H14V5c0-.566.434-1 1-1m4.188 6.625c.128-.004.277.012.406.063A1 1 0 0 1 20.156 12l-1.062 2.656v.031l-.407 1.032c-.019.054-.066.078-.093.125a3.05 3.05 0 0 0-1.813-.656c.012-.075 0-.145.032-.22l1.5-3.718c.156-.395.488-.617.875-.625M22.968 12c.134 0 .274.012.407.063a.975.975 0 0 1 .625.906V13c0 .121-.016.254-.063.375l-1.125 2.781a1 1 0 0 1-1.312.563c-.523-.211-.742-.79-.531-1.313l1.062-2.656c.016-.04.016-.086.032-.125a1.02 1.02 0 0 1 .53-.563a.9.9 0 0 1 .377-.062zM16.5 17.156a.95.95 0 0 1 1.156.719c.078.324.035.488-.062.656c-.098.168-.305.375-.75.532L12 20.313a1 1 0 0 0-.625 1.437l.906 1.656a.997.997 0 0 0 1.36.39a.997.997 0 0 0 .39-1.358l-.281-.5l3.688-.97q.046-.012.093-.03c.774-.27 1.395-.731 1.782-1.375a2.83 2.83 0 0 0 .375-1.75c.292.316.667.578 1.093.75A2.97 2.97 0 0 0 24 17.905V23c0 2.773-2.227 5-5 5h-5.281c-2.2 0-4.133-1.43-4.781-3.531l-.75-2.5c-.083-.27-.247-1.215-.126-1.907c.188-1.074.657-1.488 1.094-1.75c.438-.261.75-.28.75-.28h.063l6.437-.845q.048-.012.094-.03z"/></svg>`) }
]

const close_btn = document.querySelector('.close-modal')

close_btn.addEventListener('click', (event) => {
    const dialog = document.querySelector('.result-modal');

    dialog.close('confirmed');
})

function updatePlayerInformation(current, value) {
    checkScreen(current.screen);
    current.screen.appendChild(getIconWithValue(value));
}

function getIconWithValue(choice) {
    return VALUES.find(option => option.value.toString() === choice).icon.cloneNode(true);
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
    return String(random);
}

function playRound(human_choice, computer_choice) {
    const human = choice(Number(human_choice));
    const computer = choice(Number(computer_choice));

    if (human === computer) return 'tie'; // empate tecnico

    if (human === "paper" && computer === "rock") return "human";
    if (human === "scissors" && computer === "paper") return "human";
    if (human === "rock" && computer === "scissors") return "human";

    return 'computer';
}

function checkWinnerRound(first_player, second_player) {
    const result = playRound(first_player.choice, second_player.choice);
    let state = '';

    if (result === "human") {
        first_player.score += 1;
        state = 'human';
    } else if (result === "computer") {
        second_player.score += 1;
        state = 'computer';
    } else {
        state = 'tie';
    }

    return state
}

function resetPlayers(players) {
    players.forEach(player => {
        player.screen.innerHTML = '';
        player.choice = null;
        player.score = 0;
    })
}

function playGame() {

    const first_player = { screen: document.querySelector(".first-player"), choice: null, score: 0, type: 'human' };
    const second_player = { screen: document.querySelector(".second-player"), choice: null, score: 0, type: 'computer' };
    let round = 0;

    game_options.forEach((option) => {
        option.addEventListener('click', getSelectedOptions)
    })

    function getSelectedOptions(event) {
        round += 1;

        first_player.choice = event.currentTarget.dataset.option;
        second_player.choice = getComputerChoice();

        [first_player, second_player].forEach(player => {
            updatePlayerInformation(player, player.choice);
        })

        let state = checkWinnerRound(first_player, second_player);
        buildResultComponent(state, first_player, second_player);

        if (round === 5) {
            let message = winnerGame(first_player.score, second_player.score);
            round = 0;
            let content = { title: 'Game Winner', message, scores: [first_player.score, second_player.score] };
            showDialog(content);
            resetPlayers([first_player, second_player]);
        }
    }
}

function showDialog(content) {

    let dialog = document.querySelector('.result-modal');
    let message = document.querySelector('.modal-message');
    let title = document.querySelector('.modal-title');

    let scores_cells = document.querySelectorAll('.score');

    console.log(content.scores);

    content.scores.forEach((score, idx) => {
        console.log();
        let score_cell = scores_cells[idx];
        score_cell.textContent = score;
    })

    title.textContent = content.title;
    message.textContent = content.message;

    dialog.showModal();
}

function winnerGame(first_score, second_score) {
    let message = '';

    if (first_score === second_score) {
        return 'Empate. Intenta nuevamente';
    }

    if (first_score > second_score) {
        message = 'Humano Ganó. Le ganaremos a las maquinas'
    } else {
        message = 'Computadora Ganó. La IA nos controla'
    }

    return message
}

function buildResultComponent(state, ...players) {
    const result_match = document.querySelector('.result-match');
    let container_icons = document.createElement('div');

    container_icons.className = 'container-icons-round';

    function changeIconProperties(icon) {
        icon.setAttribute('width', 24);
        icon.setAttribute('height', 24);
        return icon;
    }

    const [first_svg, second_svg] = players.map(player => changeIconProperties(getIconWithValue(player.choice)));

    container_icons = createStructure(container_icons, 3);

    const [first_cell, second_cell, third_cell] = container_icons.querySelectorAll('.icon_cell');
    const states = container_icons.querySelectorAll('.state_cell')

    assignIcon(state, states);

    first_cell.appendChild(first_svg);
    second_cell.appendChild(fight_svg);
    third_cell.appendChild(second_svg);

    result_match.innerHTML = '';
    result_match.appendChild(container_icons);
}

function assignIcon(state, cells) {

    const [first, second, third] = cells;
    const [win, tie, lose] = ICONS;


    if (state === 'human') {
        first.appendChild(win.cloneNode(true));
        third.appendChild(lose.cloneNode(true));
    } else if (state === 'computer') {
        first.appendChild(lose.cloneNode(true));
        third.appendChild(win.cloneNode(true));
    } else {
        first.appendChild(lose.cloneNode(true));
        third.appendChild(lose.cloneNode(true));
    }
}


function createStructure(container, times) {

    for (let idx = 0; idx < times; idx++) {
        const cell = document.createElement('div');
        const icon_cell = document.createElement('div');
        const state_cell = document.createElement('div');

        cell.className = 'player_state_cell'
        icon_cell.className = 'icon_cell';
        state_cell.className = 'state_cell';

        cell.appendChild(state_cell);
        cell.appendChild(icon_cell);

        container.appendChild(cell);
    }

    return container;
}

playGame();