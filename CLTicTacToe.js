process.stdin.resume();
process.stdin.setEncoding('utf8');

class TicTacToe {
  constructor() {
    this.board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    this.hash = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    };
    this.playerOne = {
      name: 'one',
      move: 'X'
    };
    this.playerTwo = {
      name: 'two',
      move: 'O'
    }
    this.currentPlayer = this.playerOne;
  }

  displayBoard() {
    const display = this.board.slice();
    for (let i = 0; i < display.length; i++) {
      display[i] = display[i].join(' | ');
    }
    console.log(`\n${display.join('\n---------\n')}`);
  }

  checkValidMove(input) {
    if (input <= 0 && input >= 9) return false;
    return this.hash[input] === 0;
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;
  }

  promptNextMove() {
    console.log(`\nIt is player ${this.currentPlayer.name}'s move (${this.currentPlayer.move}). Please enter a number from 1 through 9.\n\n>>`);
  }

  makeMove(input) {
    const number = Number(input);
    if (this.checkValidMove(number)) {
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
          if (this.board[i][j] === number) {
            this.board[i][j] = this.currentPlayer.move;
            this.hash[number] = this.currentPlayer.move;
            this.switchPlayer();
            this.displayBoard();
            this.promptNextMove();
            this.checkWin();
            return;
          }
        }
      }
    }
    console.log('\nPlease enter a valid move.\n\n>>');
  }

  checkWin() {
    const majorDiagonal = [];
    const minorDiagonal = [];
    for (let i = 0; i < this.board.length; i++) {
      const row = this.board[i];
      if (row.every(value => value === row[0])) {
        this.displayWin(minorDiagonal[0]);
        return;
      }

      const column = [];
      for (let j = 0; j < this.board.length; j++) {
        column.push(this.board[j][i]);
      }

      if (column.every(value => value === column[0])) {
        this.displayWin(column[0]);
        return;
      }

      majorDiagonal.push(this.board[i][i]);
      minorDiagonal.push(this.board[i][this.board[i].length - i - 1]);
    }

    if (majorDiagonal.every(value => value === majorDiagonal[0])) {
      this.displayWin(majorDiagonal[0]);
      return;
    }

    if (minorDiagonal.every(value => value === minorDiagonal[0])) {
      this.displayWin(minorDiagonal[0]);
      return;
    }
  }

  displayWin(winningMove) {
    const winner = winningMove === 'X' ? 'one' : 'two';
    console.log(`\nPlayer ${winner} wins!\n\n>>`);
    Game = null;
    return;
  }
};

let Game = null;

console.log('\nWelcome to Tic Tac Toe!\n\nTo start a game, please type \'start\'.\n\nTo show options, please type \'options\'\n\nTo quit, please type \'quit\'\n\n>>');

process.stdin.on('data', text => {
  processUserInput(text);
});

const processUserInput = input => {
  if (input === 'start\n') {
    Game = new TicTacToe();
    Game.displayBoard();
    Game.promptNextMove();
  } else if (input === 'options\n') {
    console.log('\nCommands:\n\n\'start\' : start a new game\n\n\'quit\' : exit tic tac toe\n\n\'show board\' : show current state of the board\n\n\'current player\' : show current player\n\n>>');
  } else if (input === 'current player\n') {
    Game ? console.log(`\nThe current player is ${Game.currentPlayer.name}\n\n>>`) : console.log('\nThere is no game yet. Please type \'start\' to start one.\n\n>>');
  } else if (input === 'show board\n') {
    Game ? Game.displayBoard() + console.log('\n\n>>') : console.log('\nThere is no game yet. Please type \'start\' to start a new game.\n\n>>');
  } else if (input === 'quit\n') {
    exit();
  } else {
    Game ? Game.makeMove(input) : console.log('\nPlease enter a valid command.\n\nType \'options\' to see options.\n\n>>');
  }
};

const exit = () => {
  console.log('Thanks for playing. Goodbye for now!');
  process.exit();
};