// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {

      var rowArray = this.rows()[rowIndex];    //gives array
      var spotsOccupied = rowArray.reduce(function(accumulator, item) {
        return accumulator + item;
      }, 0);

      return spotsOccupied > 1 ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.rows();

      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // return false; // fixme
      var board = this.rows();
      var testBoard = board.map((rows) => {
        return rows.slice(0);
      });
      // console.log(testBoard);

      for (var x = 0; x < board.length; x++) {
        for (var y = 0; y < board.length; y++) {
          testBoard[y][x] = board[x][y];
        }
      }

      // console.log('testboard', JSON.stringify(testBoard));
      // console.log('board', JSON.stringify(board));
      var colArray = testBoard[colIndex];
      var spotsOccupied = colArray.reduce(function(accumulator, item) {
        return accumulator + item;
      }, 0);

      return spotsOccupied >= 2 ? true : false;


    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // return false; // fixme
      var board = this.rows();
      var testBoard = board.map((rows) => {
        return rows.slice(0);
      });

      for (var x = 0; x < board.length; x++) {
        for (var y = 0; y < board.length; y++) {
          testBoard[y][x] = board[x][y];
        }
      }

      for (var i = 0; i < testBoard.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var spotsOccupied = 0;
      var row = 0;
      var col = majorDiagonalColumnIndexAtFirstRow;
      var board = this.rows();

      var inspectBottomRightSpot = function (col, row) {
        if ( col >= 0 ) {
          var currentPos = board[row][col];
          if ( currentPos === 1 ) {
            spotsOccupied++;
            if ( spotsOccupied >= 2 ) {
              return;
            }
          }
          //base case ==> terminate recursion
          if (col + 1 >= board.length || row + 1 >= board.length) {
            return;
          }
        }
        inspectBottomRightSpot(col + 1, row + 1);
      };

      inspectBottomRightSpot(col, row);
      return spotsOccupied >= 2 ? true : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // return false; // fixme
      var board = this.rows();

      for (var i = -board.length + 1; i < board.length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        } 
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var spotsOccupied = 0;
      var row = 0;
      var col = minorDiagonalColumnIndexAtFirstRow;
      var board = this.rows();

      var inspectBottomLeftSpot = function (col, row) {
        if (col <= board.length - 1) {
          var currentPos = board[row][col];
          if ( currentPos === 1 ) {
            spotsOccupied++;
            if ( spotsOccupied >= 2 ) {
              return;
            }
          }
          if (col - 1 < 0 || row + 1 >= board.length) {
            return;
          }
        }
        inspectBottomLeftSpot(col - 1, row + 1);
      };

      inspectBottomLeftSpot(col, row);
      return spotsOccupied >= 2 ? true : false;     
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();

      for (var i = 0; i < 2 * board.length - 1; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        } 
      }
      return false;
    },

    /*--------------------  End of Helper Functions  ---------------------*/
    // copyBoard: function(board) {
    //   var newboard = new Array(board.length);
    //     for (var i = 0; i < newboard.length; i++) {
    //       var newRow = new Array(board.length);
    //       newboard[i] = newRow;
    //       for (var j = 0; j < newboard.length; j++) {
    //         newboard[i][j] = board[i][j];
    //       }   
    //     }
    //   return newboard;
    // }

  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());


// countNRooksSolutions = function(n) {
//     debugger;
//   n = 2;
//   var solutionCount = 0;
//   var board = new Board([[0,0],[0,0]]);
//   board.rooks = 0;

//   var checkNextRow = function (board) {
//     for (var i = 0; i < n; i++) {
//       //copy board
//       var copy = new Board(board.rows());
//       //toggle copy @ board.rooks and colIndex, increment board.rooks
//       copy.togglePiece(board.rooks, i);
//       board.rooks++;

//       //if does NOT have rook conflict
//       if (!board.hasAnyRooksConflicts()) {
//         //if board.rooks === n
//         if (board.rooks === n) {
//           //incremnet solutionCount
//           solutionCount++;
//           return;
//         } else {
//           //call checkNextRow(copy)
//           checkNextRow(copy);
//         }
//       } else {
//         return;
//       }
//       return;
//     }
//   };
//   checkNextRow(board);
//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };

// countNRooksSolutions(2);
