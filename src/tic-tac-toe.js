class TicTacToe {
    constructor() {
        this.mesh = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.turn = 0; // (0-8)
        this.symbol = 'x'; // 'x','o'
        this.win = false;
        this.winner = null;
        this.draw = false;
    }


    // should return x or o
    getCurrentPlayerSymbol() {
        return this.symbol;
    }


    // should properly update class state (change current player, update marks storage etc.)
    nextTurn(rowIndex, columnIndex) {
        let cell = this.getFieldValue(rowIndex, columnIndex)
        if (!cell) {
            this.mesh[rowIndex][columnIndex] = this.symbol;
            this.symbol = (this.symbol === 'x') ? 'o' : 'x';
            if (this.turn >= 4) {
                this.findWinner();
            }
            this.turn++;
            if (this.noMoreTurns() && !(this.win)) {
                this.draw = true;
            };
        }
    }


    // should return true if game is finished (e.g. there is a winner or it is a draw)
    isFinished() {
        return (this.win || this.draw) ? true : false;
    }


    // should return winner symbol (x or o) or null if there is no winner yet
    getWinner() {
        return this.winner;
    }

    // for getWinner() 
    findWinner() {
        let m = this.mesh;
        let test = [].concat(m);
        for (let i = 0; i < 3; i++) {
            test.push([m[0][i], m[1][i], m[2][i]]);
        }
        test.push([m[0][0], m[1][1], m[2][2]], [m[0][2], m[1][1], m[2][0]]);
        let ar = test.map((el) => {
            return el.join('');
        });
        if (ar.includes('xxx')) {
            this.win = true;
            this.winner = 'x';
        }
        if (ar.includes('ooo')) {
            this.win = true;
            this.winner = 'o';
        }
        return null;
    }

    // should return true if there is no more fields to place a x or o
    noMoreTurns() {
        return (this.turn > 8);
    }
    // should return true if there is no more turns and no winner
    isDraw() {
        return this.draw;
        //return this.noMoreTurns() && !(this.win);
    }
    // should return matrix[row][col] value (if any) or null
    getFieldValue(rowIndex, colIndex) {
        return this.mesh[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;