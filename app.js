// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const board = document.getElementById("board");
    const resetButton = document.getElementById("reset");
    const message = document.getElementById("message");

    let currentPlayer = "X";
    let boardState = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        return null;
    };

    const checkDraw = () => {
        return boardState.every(cell => cell !== null);
    };

    const updateMessage = (msg) => {
        message.textContent = msg;
    };

    const handleClick = (e) => {
        const index = e.target.dataset.index;
        if (boardState[index] || checkWinner() || checkDraw()) return;

        boardState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer.toLowerCase()); 

        const winner = checkWinner();
        if (winner) {
            updateMessage(`Player ${winner} wins!`);
        } else if (checkDraw()) {
            updateMessage("It's a draw!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateMessage(`Player ${currentPlayer}'s turn`);
        }
    };

    const resetGame = () => {
        boardState.fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("x", "o"); 
        });
        currentPlayer = "X";
        updateMessage(`Player ${currentPlayer}'s turn`);
    };

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    resetButton.addEventListener("click", resetGame);

    updateMessage(`Player ${currentPlayer}'s turn`);
});
