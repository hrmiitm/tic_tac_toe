const boardEl = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const currentEl = document.getElementById('current');
const messageEl = document.getElementById('message');
const resetBtn = document.getElementById('reset');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function render() {
  cells.forEach((cell, idx) => {
    cell.textContent = board[idx] || '';
    cell.classList.remove('win');
  });
  currentEl.textContent = currentPlayer;
}

function checkWin() {
  for (const combo of winCombos) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo };
    }
  }
  if (board.every(Boolean)) return { winner: null };
  return null;
}

function handleClick(e) {
  if (gameOver) return;
  const idx = Number(e.target.dataset.index);
  if (board[idx]) return;
  board[idx] = currentPlayer;
  const result = checkWin();
  if (result) {
    gameOver = true;
    if (result.winner) {
      messageEl.textContent = `${result.winner} wins!`;
      result.combo.forEach(i => cells[i].classList.add('win'));
    } else {
      messageEl.textContent = `It's a tie!`;
    }
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
  render();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', () => {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  messageEl.textContent = '';
  render();
});

render();
