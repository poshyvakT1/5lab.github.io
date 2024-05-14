const gameArea = document.getElementById('gameArea');
const cube = document.createElement('div');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
let score = 0;
let timer;
let timerInterval;
let gameAreaSize;
let targetTime;
let isGameRunning = false;

function startGame() {
    if (isGameRunning) return;

    const targetScore = document.getElementById('targetScore').value;
    const cubeColor = document.getElementById('cubeColor').value;
    const level = document.getElementById('level').value;

    if (gameArea.contains(cube)) {
        gameArea.removeChild(cube);
    }

    cube.id = 'cube';
    cube.style.backgroundColor = cubeColor;
    gameArea.appendChild(cube);

    switch (level) {
        case 'easy':
            gameAreaSize = 400;
            cube.style.width = '50px';
            cube.style.height = '50px';
            targetTime = 8;
            break;
        case 'medium':
            gameAreaSize = 600;
            cube.style.width = '30px';
            cube.style.height = '30px';
            targetTime = 4;
            break;
        case 'hard':
            gameAreaSize = 800;
            cube.style.width = '20px';
            cube.style.height = '20px';
            targetTime = 2;
            break;
    }

    gameArea.style.width = `${gameAreaSize}px`;
    gameArea.style.height = `${gameAreaSize}px`;

    score = -1;
    scoreDisplay.textContent = `Score: ${score}`;
    timer = targetTime;
    timerDisplay.textContent = `Time: ${timer}s`;

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    cube.removeEventListener('click', moveCube);
    cube.addEventListener('click', moveCube);
    moveCube();
    isGameRunning = true;

    function moveCube() {
        const x = Math.floor(Math.random() * (gameAreaSize - cube.offsetWidth));
        const y = Math.floor(Math.random() * (gameAreaSize - cube.offsetHeight));
        cube.style.left = `${x}px`;
        cube.style.top = `${y}px`;
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        if (score >= targetScore) {
            endGame(`You won! Level: ${level}`);
        }
        timer = targetTime;
    }

    function updateTimer() {
        timer--;
        timerDisplay.textContent = `Time: ${timer}s`;
        if (timer === 0) {
            endGame(`You lost! Level: ${level}, Score: ${score}`);
        }
    }

    function endGame(message) {
        clearInterval(timerInterval);
        cube.removeEventListener('click', moveCube);
        alert(message);
        isGameRunning = false;
    }
}

const startGameButton = document.getElementById('startGame');
startGameButton.addEventListener('click', startGame);
