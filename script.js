const gameBoard = document.getElementById('game-board');

let tiles = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

function createBoard() {
    gameBoard.innerHTML = '';
    tiles.forEach(row => {
        row.forEach(tile => {
            const tileDiv = document.createElement('div');
            tileDiv.classList.add('tile');
            if (tile !== 0) {
                tileDiv.innerText = tile;
                tileDiv.style.backgroundColor = getTileColor(tile);
            }
            gameBoard.appendChild(tileDiv);
        });
    });
}

function getTileColor(value) {
    switch (value) {
        case 2: return '#eee4da';
        case 4: return '#ede0c8';
        case 8: return '#f2b179';
        case 16: return '#f59563';
        case 32: return '#f67c5f';
        case 64: return '#f65e3b';
        case 128: return '#edcf72';
        case 256: return '#edcc61';
        case 512: return '#edc850';
        case 1024: return '#edc53f';
        case 2048: return '#edc22e';
        default: return '#cdc1b4';
    }
}

function spawnTile() {
    let emptyTiles = [];
    tiles.forEach((row, rowIndex) => {
        row.forEach((tile, colIndex) => {
            if (tile === 0) {
                emptyTiles.push({ row: rowIndex, col: colIndex });
            }
        });
    });

    if (emptyTiles.length === 0) return;

    let { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    tiles[row][col] = Math.random() < 0.9 ? 2 : 4;
}

function moveTiles(direction) {
    switch (direction) {
        case 'up':
            for (let col = 0; col < 4; col++) {
                let newColumn = [0, 0, 0, 0];
                let index = 0;
                for (let row = 0; row < 4; row++) {
                    if (tiles[row][col] !== 0) {
                        if (newColumn[index] === 0) {
                            newColumn[index] = tiles[row][col];
                        } else if (newColumn[index] === tiles[row][col]) {
                            newColumn[index] *= 2;
                            index++;
                        } else {
                            index++;
                            newColumn[index] = tiles[row][col];
                        }
                    }
                }
                for (let row = 0; row < 4; row++) {
                    tiles[row][col] = newColumn[row];
                }
            }
            break;
        case 'down':
            for (let col = 0; col < 4; col++) {
                let newColumn = [0, 0, 0, 0];
                let index = 3;
                for (let row = 3; row < 4; row--) {
                    if (tiles[row][col] !== 0) {
                        if (newColumn[index] === 0) {
                            newColumn[index] = tiles[row][col];
                        } else if (newColumn[index] === tiles[row][col]) {
                            newColumn[index] *= 2;
                            index--;
                        } else {
                            index--;
                            newColumn[index] = tiles[row][col];
                        }
                    }
                }
                for (let row = 0; row < 4; row++) {
                    tiles[row][col] = newColumn[row];
                }
            }
            break;
        case 'left':
            for (let row = 0; row < 4; row++) {
                let newRow = [0, 0, 0, 0];
                let index = 0;
                for (let col = 0; col < 4; col++) {
                    if (tiles[row][col] !== 0) {
                        if (newRow[index] === 0) {
                            newRow[index] = tiles[row][col];
                        } else if (newRow[index] === tiles[row][col]) {
                            newRow[index] *= 2;
                            index++;
                        } else {
                            index++;
                            newRow[index] = tiles[row][col];
                        }
                    }
                }
                tiles[row] = newRow;
            }
            break;
        case 'right':
            for (let row = 0; row < 4; row++) {
                let newRow = [0, 0, 0, 0];
                let index = 3;
                for (let col = 3; col >= 0; col--) {
                    if (tiles[row][col] !== 0) {
                        if (newRow[index] === 0) {
                            newRow[index] = tiles[row][col];
                        } else if (newRow[index] === tiles[row][col]) {
                            newRow[index] *= 2;
                            index--;
                        } else {
                            index--;
                            newRow[index] = tiles[row][col];
                        }
                    }
                }
                tiles[row] = newRow;
            }
            break;
    }
    spawnTile();
    createBoard();
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            moveTiles('up');
            break;
        case 'ArrowDown':
            moveTiles('down');
            break;
        case 'ArrowLeft':
            moveTiles('left');
            break;
        case 'ArrowRight':
            moveTiles('right');
            break;
    }
});

// Initialize game
spawnTile();
spawnTile();
createBoard();
