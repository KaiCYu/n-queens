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
  // var solution = undefinenewd; //fixme
  var board = new Board({n: n});
  var counter = 0;



  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   var copyBoard = function(board) {
//     var newboard = new Array(board.length);
//       for (var i = 0; i < newboard.length; i++) {
//         var newRow = new Array(board.length);
//         newboard[i] = newRow;
//         for (var j = 0; j < newboard.length; j++) {
//           newboard[i][j] = board[i][j];
//         }   
//       }
//     return newboard;
//   };

//   var solutionCount = 0;
//   var board = new Board({ n: n });
//   board.rooks = 0;

//   var checkNextRow = function (board) {
//     for (var i = 0; i < n; i++) {
//       var matrix = board.rows();
//       matrix = copyBoard(matrix);
//       var numRooks = board.rooks;
//       var copy = new Board(matrix);
//       copy.rooks = numRooks;


//       copy.togglePiece(copy.rooks, i);
//       copy.rooks++;
//       if (!copy.hasAnyRooksConflicts()) {
//         if (copy.rooks === n) {
//           solutionCount++;
//           return;
//         } else {
//           checkNextRow.call(copy, copy);
//         }
//       }
//     }
//     return;
//   };

//   checkNextRow(board);
//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };

window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({ n: n});
  var row = 0;
  var inspectSpot = function(board, row) {
    // debugger;
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, i);
        continue;
      } else if (row === n - 1) {
        solutionCount++;
      }
      //else if (row === n - 1) {
      //   solution++
      // }
      if (row < n - 1) {
        inspectSpot(board, row + 1);
      }
      // if (!board.hasAnyRooksConflicts() && row === n - 1) {
      //   solutionCount++;
      // }

      board.togglePiece(row, i);
    }
  };
  inspectSpot(board, row);
  return solutionCount;
};

// countNRooksSolutions(3);



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
