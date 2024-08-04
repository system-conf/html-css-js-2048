const gameBoard = document.getElementById('game-board');
const playButton = document.getElementById('play-button');
const restartButton = document.getElementById('restart-button');

let board;
let size = 4;

playButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

function startGame() {
    board = Array(size).fill().map(() => Array(size).fill(0));
    addRandomTile();
    addRandomTile();
    updateBoard();
    document.addEventListener('keydown', handleInput);
}

function addRandomTile() {
    let emptyTiles = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === 0) {
                emptyTiles.push({ x: i, y: j });
            }
        }
    }

    if (emptyTiles.length > 0) {
        let { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            if (board[i][j] !== 0) {
                tile.textContent = board[i][j];
                tile.setAttribute('data-value', board[i][j]);
            }
            gameBoard.appendChild(tile);
        }
    }
}

function handleInput(event) {
    switch (event.key) {
        case 'ArrowUp':
            slideUp();
            break;
        case 'ArrowDown':
            slideDown();
            break;
        case 'ArrowLeft':
            slideLeft();
            break;
        case 'ArrowRight':
            slideRight();
            break;
        default:
            return;
    }
    addRandomTile();
    updateBoard();
    if (checkGameOver()) {
        alert('Game Over!');
        document.removeEventListener('keydown', handleInput);
    }
}

function slide(array) {
    let arr = array.filter(val => val);
    let missing = size - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);

    for (let i = size - 1; i > 0; i--) {
        if (arr[i] === arr[i - 1]) {
            arr[i] *= 2;
            arr[i - 1] = 0;
        }
    }

    arr = arr.filter(val => val);
    missing = size - arr.length;
    zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);

    return arr;
}

function slideUp() {
    for (let j = 0; j < size; j++) {
        let arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(board[i][j]);
        }
        arr = slide(arr);
        for (let i = 0; i < size; i++) {
            board[i][j] = arr[i];
        }
    }
}

function slideDown() {
    for (let j = 0; j < size; j++) {
        let arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(board[i][j]);
        }
        arr = slide(arr.reverse()).reverse();
        for (let i = 0; i < size; i++) {
            board[i][j] = arr[i];
        }
    }
}

function slideLeft() {
    for (let i = 0; i < size; i++) {
        board[i] = slide(board[i]);
    }
}

function slideRight() {
    for (let i = 0; i < size; i++) {
        board[i] = slide(board[i].reverse()).reverse();
    }
}

function checkGameOver() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === 0) {
                return false;
            }
            if (i !== size - 1 && board[i][j] === board[i + 1][j]) {
                return false;
            }
            if (j !== size - 1 && board[i][j] === board[i][j + 1]) {
                return false;
            }
        }
    }
    return true;
}

startGame();
