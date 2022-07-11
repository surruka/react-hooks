// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

const initialValues = [Array(9).fill(null)];

const useLocalStorageState = () => {
  const [currentStep, setCurrentStep] = React.useState(() => {
    const localCurrentStep = localStorage.getItem('currentStep');
    return localCurrentStep ? localCurrentStep : 0;
  });
  const [squares, setSquares] = React.useState(() => {
    const localSquares = JSON.parse(localStorage.getItem('squares'));
    return localSquares ? localSquares : initialValues
  })
  
  function setSquaresValues (currentStepMove) {
    const updatedValues = [...squares].concat([currentStepMove]);
    setSquares(updatedValues);
    localStorage.setItem('squares', JSON.stringify(updatedValues));
  }

  function reset() {
    setCurrentStep(0);
    setSquares(initialValues);
    localStorage.setItem('squares', JSON.stringify(initialValues));
  }

  return [
    squares,
    currentStep,
    setCurrentStep,
    setSquaresValues,
    reset,
  ];
};

function Board() {
  const [squares, currentStep, setCurrentStep, setSquaresValues, reset] = useLocalStorageState();
  const nextValue = calculateNextValue(squares[currentStep]);
  const winner = calculateWinner(squares[currentStep]);
  const status = calculateStatus(winner, squares[currentStep], nextValue);

  function selectSquare(square) {
    if (!!winner || !!squares[currentStep][square]) {
      return;
    }
    const updatedSquares = [...squares[currentStep]];
    updatedSquares[square] = nextValue;
    setCurrentStep(currentStep + 1);
    setSquaresValues(updatedSquares);
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[currentStep][i]}
      </button>
    )
  }

  function handleOnGoToMove(index) {
    setCurrentStep(index);
  }

  return (
    <div style={{display: 'flex', gap: 20}}>
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className="restart" onClick={reset}>
          restart
        </button>
      </div>
      <div>
        <div className="status">{status}</div>
        <div>
          {squares.map((elem, index) => {
            console.log(index)
            return (
              <button style={{display: 'block', marginTop: 20}}type="button" onClick={() => handleOnGoToMove(index)}>
                {index === 0
                  ? `Go to the initial move. ${(index === currentStep) ? '(Current Move)' : ''}`
                  : `Go to the move ${index + 1}. ${(index === currentStep) ? '(Current Move)' : ''}`}
              </button>
            );        
          })}
        </div>
      </div>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
