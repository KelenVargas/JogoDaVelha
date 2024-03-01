document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll(".cell");
  const currentPlayerDisplay = document.querySelector("#current-player");
  const scoreDisplay = document.querySelector("#score");
  const playerVsPlayerButton = document.getElementById("player-vs-player");
  const playerVsCpuButton = document.getElementById("player-vs-cpu");
  const cpuVsCpuButton = document.getElementById("cpu-vs-cpu");

  let currentPlayer = "X"; /* para ver quem é o jogador atual */
  let board = ["", "", "", "", "", "", "", "", ""]; /* representa o tabuleiro */
  let gameOver = false; /* se o jogo está em andamento ou se acabou */
  let score = { X: 0, O: 0 }; /* para g a contagem de vitorias dps jogadores */
  let currentMode = ""; /* para mostrar o modo atual */
  let cpuMoveTimeout; /* movimentos da cpu */

  playerVsPlayerButton.addEventListener("click", function () {
    startGame("player");
  });

  playerVsCpuButton.addEventListener("click", function () {
    startGame("player-cpu");
  });

  cpuVsCpuButton.addEventListener("click", function () {
    startGame("cpu");
  });
  /* aqui estou iniciando o jogo no modo escolhido */
  function startGame(mode) {
    resetGame();
    currentMode = mode;

    if (mode === "player" || mode === "player-cpu") {
      cells.forEach((cell) => cell.addEventListener("click", handleHumanMove));
    }

    if (mode === "cpu" && currentMode !== "player-cpu") {
      makeCPUMove();
    }

    if (mode === "cpu" && currentMode === "cpu") {
      setTimeout(() => {
        playCPUGame();
      }, 0);
    }
  }
  /* reiniciando o jogo */
  function resetGame() {
    currentPlayer = "X";
    gameOver = false;
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    currentPlayerDisplay.textContent = `Vez do:${currentPlayer}`;
  }

  /* para fazer as jogadas humanas */
  function handleHumanMove(event) {
    if (!gameOver && cellIsEmpty(event.target)) {
      makeMove(event.target);

      setTimeout(() => {
        checkGameStatus();

        if (!gameOver && currentMode === "player-cpu") {
          makeCPUMove();
          checkGameStatus();
          setTimeout
        }
      }, 500);
    }
  }
  /* para o modo cpu vs cpu */
  function playCPUGame() {
    if (!gameOver && currentMode === "cpu") {
      setTimeout(() => {
        makeCPUMove();
        checkGameStatus();
        playCPUGame();
      }, 500);
    }
  }
  /* movimentos da cpu */
  function makeCPUMove() {
    if (!gameOver && currentMode.includes("cpu")) {
      const emptyCells = Array.from(cells).filter((cell) => cellIsEmpty(cell));
      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const selectedCell = emptyCells[randomIndex];
        makeMove(selectedCell);
      }
    }
  }
  /* atualizando o estado do tabuleiro */
  function makeMove(cell) {
    const cellIndex = parseInt(cell.dataset.cell) - 1;
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    switchPlayer();
  }
  /* para trocar os jogadores */
  function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerDisplay.textContent = `Vez do: ${currentPlayer}`;
  }
  /* vendo se há espaço em branco */
  function cellIsEmpty(cell) {
    const cellIndex = parseInt(cell.dataset.cell) - 1;
    return board[cellIndex] === "";
  }
  /* para ver se há vencedor ou empate */
  function checkGameStatus() {
    checkWinner();
    checkGameOver();
  }
  /* veririficando vitória */
  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameOver = true;
        alert(`${board[a]} é o vencedor!`);
        updateScore(board[a]);
        endGame();
        break;
      }
    }
  }

  /* verificando empate */
  function checkGameOver() {
    if (!gameOver && !board.includes("")) {
      gameOver = true;
      alert("Empate! O jogo terminou sem vencedores.");
      endGame();
    }
  }
  /* fazer com que a cpu não tenha mais movimentos quando o jogo acabar */
  function endGame() {
    clearTimeout(cpuMoveTimeout);
  }
  /* para mostrar o placar */
  function updateScore(player) {
    score[player]++;
    scoreDisplay.textContent = `Placar: X - ${score["X"]} | O - ${score["O"]}`;
  }
});


const reiniciarBtn = document.querySelector("[data-reiniciarBtn]");

reiniciarBtn.addEventListener('click', () => {
  window.location.reload();
})