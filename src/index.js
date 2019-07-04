import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import _ from 'lodash';

function Square(props) {
    return (
        <button className={`square ${props.value === 'X' ? 'blue' : 'red'}`} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(225).fill(null),
            xIsNext: true,
            winner: null
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (this.state.winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X': 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            winner: calculateWinner(squares, i)
        })
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}/>;
    }

    render() {
        let status;
        if (this.state.winner) {
            status = 'Winner: ' + this.state.winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                {_.times(15, i =>
                    <div className="board-row">
                        {_.times(15, j =>
                            this.renderSquare(i * 15 + j)
                        )}
                    </div>
                )}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares, lastMove) {
    if (
        squares[lastMove] && (
        (inRow(squares, lastMove, 0, 1) + inRow(squares, lastMove, 0, -1) >= 6) ||
        (inRow(squares, lastMove, 1, 1) + inRow(squares, lastMove, -1, -1) >= 6) ||
        (inRow(squares, lastMove, 1, 0) + inRow(squares, lastMove, -1, 0) >= 6) ||
        (inRow(squares, lastMove, 1, -1) + inRow(squares, lastMove, -1, 1) >= 6)
        )
    ) {
        return squares[lastMove];
    } else {
        return null;
    }
}

function inRow(squares, lastMove, rowDelta, colDelta) {
    let total = 0;
    let curRow = Math.floor(lastMove / 15);
    let curCol = lastMove % 15;
    let color = squares[lastMove];
    while (insideBoard(curRow, curCol) && squares[curRow * 15 + curCol] === color) {
        curRow += rowDelta;
        curCol += colDelta;
        ++total;
    }
    return total;
}

function insideBoard(row, col) {
    return row >= 0 && row < 15 && col >= 0 && col < 15;
}