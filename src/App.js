import React from 'react';
import './App.scss';


function gameArray(cols, rows) {
    let fullBoardArray = Array(rows).fill().map(() => Array(cols).fill(false));

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            fullBoardArray[x][y] = Math.round(Math.random());
        }
    }

    return fullBoardArray;
};


class GameField extends React.Component {

    render() {
        let fieldArray = [];

        for (let x = 0; x < this.props.row; x++) {
            for (let y = 0; y < this.props.column; y++) {
                fieldArray.push(
                    <GameCell
                        key={x + "-" + y}
                        status={this.props.field[x][y]}
                    />
                );
            }
        }

        return (
            <div
                className='game-of-life__board'
                style={{grid: `repeat(${this.props.row}, 20px) / repeat(${this.props.column}, 20px)`}}
            >
                {fieldArray}
            </div>
        );
    }
}

class GameCell extends React.Component {
    render() {
        return (
            <div
                className={
                    `game-of-life__cell ${this.props.status ? 'game-of-life__cell--filled' : 'game-of-life__cell--empty'}`
                }
            />
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            column: this.props.column,
            row: this.props.row,
            field: gameArray(this.props.row, this.props.column),
        }
    }

    generation = () => {
        let currentGen = this.state.field;
        let nextGen = JSON.parse(JSON.stringify(this.state.field));

        for (let i = 0; i < this.state.row; i++) {
            for (let j = 0; j < this.state.column; j++) {
                let nearbyCount = 0;

                if (i > 0 && currentGen[i - 1][j]) {
                    nearbyCount++;
                }
                if (i > 0 && j > 0 && currentGen[i - 1][j - 1]) {
                    nearbyCount++;
                }
                if (i > 0 && j < this.state.column - 1 && currentGen[i - 1][j + 1]) {
                    nearbyCount++;
                }
                if (j < this.state.column - 1 && currentGen[i][j + 1]) {
                    nearbyCount++;
                }
                if (j > 0 && currentGen[i][j - 1]) {
                    nearbyCount++;
                }
                if (i < this.state.row - 1 && currentGen[i + 1][j]) {
                    nearbyCount++;
                }
                if (i < this.state.row - 1 && j > 0 && currentGen[i + 1][j - 1]) {
                    nearbyCount++;
                }
                if (i < this.state.row - 1 && j < this.state.column - 1 && currentGen[i + 1][j + 1]) {
                    nearbyCount++;
                }


                if (currentGen[i][j] && (nearbyCount < 2 || nearbyCount > 3)) {
                    nextGen[i][j] = 0;
                }
                if (!currentGen[i][j] && nearbyCount === 3) {
                    nextGen[i][j] = 1;
                }
            }
        }

        this.setState({
            field: nextGen
        });
    }

    buttonRun = () => {
        clearInterval(this.interval);
        this.interval = setInterval(this.generation, 150);
    }

    buttonStop = () => {
        clearInterval(this.interval);
    }

    buttonReload = () => {
        let newField = gameArray(this.props.row, this.props.column);

        this.setState({
            field: newField
        });
    }

    render() {
        return (
            <div>
                <button
                    className='game-of-life__button game-of-life__button--run'
                    onClick={this.buttonRun}
                >
                    Run
                </button>
                <button
                    className='game-of-life__button game-of-life__button--stop'
                    onClick={this.buttonStop}
                >
                    Stop
                </button>
                <button
                    className='game-of-life__button game-of-life__button--reload'
                    onClick={this.buttonReload}
                >
                    Reload
                </button>
                <GameField
                    column={this.state.column}
                    row={this.state.row}
                    field={this.state.field}
                />
            </div>
        )
    }
}

function App() {
    let column = 60;
    let row = 30;

    return (
        <div className="game-of-life">
            <h1 className='game-of-life__title'>Conway ́s game of life</h1>
            <Game
                column={column}
                row={row}
            />
        </div>
    );
}

export default App;
