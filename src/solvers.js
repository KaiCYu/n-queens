/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({ n: n});
  var row = 0;

  var inspectSpot = function(board, row) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, i);
        continue;
      } else if (row === n - 1) {
        return board.rows();
      }
      if (row < n - 1) {
        return inspectSpot(board, row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  return inspectSpot(board, row);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
};

window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({ n: n});
  var row = 0;

  var inspectSpot = function(board, row) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, i);
        continue;
      } else if (row === n - 1) {
        solutionCount++;
      }
      if (row < n - 1) {
        inspectSpot(board, row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  inspectSpot(board, row);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

window.findNQueensSolution = function(n) {

  var solution = [];
  var board = new Board({ n: n});
  var row = 0;
  var pieceAdded = true;

  if (n === 0) {
    solution = [[]];
  }
  if (n === 1) {
    solution = 1;
  }
  if (n === 2) {
    return [[], []];
  }
  if (n === 3) {
    return [[], [], []];
  }

  var inspectSpot = function(board, row) {
    for (var i = 0; i < n; i++) {

      board.togglePiece(row, i);
      pieceAdded = true;
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(row, i);
        pieceAdded = false;
        continue;
      } else if (row === n - 1 && !board.hasAnyQueensConflicts()) {
        if (solution[0] === undefined) {
          var arr = copyBoard(board.rows());
          solution = [arr];  
        }

      }
      if (row < n - 1 && pieceAdded) {
        inspectSpot(board, row + 1);
      }
      board.togglePiece(row, i);
      pieceAdded = false;
    }
  };

  inspectSpot(board, row);
  console.log(solution[0]);
  return solution[0];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }

  var solutionCount = 0;
  var board = new Board({ n: n});
  var row = 0;
  var pieceAdded = true;

  var inspectSpot = function(board, row) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      pieceAdded = true;
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(row, i);
        pieceAdded = false;
        continue;
      } else if (row === n - 1 && !board.hasAnyQueensConflicts()) {
        solutionCount++;
      }
      if (row < n - 1 && pieceAdded) {
        inspectSpot(board, row + 1);
      }
      board.togglePiece(row, i);
      pieceAdded = false;
    }
  };

  inspectSpot(board, row);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


window.copyBoard = function(board) {
  var newboard = new Array(board.length);
  for (var i = 0; i < newboard.length; i++) {
    var newRow = new Array(board.length);
    newboard[i] = newRow;
    for (var j = 0; j < newboard.length; j++) {
      newboard[i][j] = board[i][j];
    }   
  }
  return newboard;
};











