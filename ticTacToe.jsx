import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const rowStyle = {
  display: "flex"
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
  cursor: "pointer"
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid"
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px"
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px"
};

const MARK = {
    X: 'X',
    O: 'O'
  }

const Square = ({ mark, onClick, id }) => {
  const value = mark !== null ? (mark ? MARK.X : MARK.O) : "";
  return (
    <div className="square" style={squareStyle} onClick={onClick} id={id}>
      {value}
    </div>
  );
};

const Board = () => {
  const defaultFieldsValues = {
    a1: null,
    a2: null,
    a3: null,
    b1: null,
    b2: null,
    b3: null,
    c1: null,
    c2: null,
    c3: null,
  };

  const [boardFields, setBoardFields] = useState(defaultFieldsValues);
  const [markState, setMarkState] = useState(true);
  const [winner, setWinner] = useState(null)
  const [endOfGame, setEndOfGame] = useState(false);

  const handleClick = (event) => {
    if(endOfGame || winner) {
      return false;
    }

    const { id } = event.target;

    setBoardFields({
      ...boardFields,
      [id]: markState
    })

    setMarkState(!markState);
  }

  const handleReset = () => {
    setBoardFields(defaultFieldsValues);
    setMarkState(true);
    setWinner(null);
    setEndOfGame(false);
  }

  useEffect(() => {
    setEndOfGame(Object.values(boardFields).every(v => v !== null));

    const winMatrix = [
      [boardFields.a1, boardFields.a2, boardFields.a3],
      [boardFields.b1, boardFields.b2, boardFields.b3],
      [boardFields.c1, boardFields.c2, boardFields.c3],
      [boardFields.a1, boardFields.b1, boardFields.c1],
      [boardFields.a2, boardFields.b2, boardFields.c2],
      [boardFields.a3, boardFields.b3, boardFields.c3],
      [boardFields.a1, boardFields.b2, boardFields.c3],
      [boardFields.a3, boardFields.b2, boardFields.c1]
    ];

    winMatrix.filter(item => {
      if (item.every(v => v === true) || item.every(v => v === false)) {
        console.log(item);
        setWinner(markState ? MARK.O : MARK.X);
      }
    })
  }, [boardFields]);

  return (
    <div style={containerStyle} className="gameBoard">
      <div className="status" style={instructionsStyle}>
        Next player: {markState ? MARK.X : MARK.O}
      </div>
      <div className="winner" style={instructionsStyle}>
        {winner && `Winner: ${winner}`}
        {endOfGame !== false && 'End of game'}
      </div>
      <button style={buttonStyle} onClick={handleReset}>
        Reset
        </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square onClick={handleClick} id="a1" mark={boardFields.a1} />
          <Square onClick={handleClick} id="a2" mark={boardFields.a2} />
          <Square onClick={handleClick} id="a3" mark={boardFields.a3} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square onClick={handleClick} id="b1" mark={boardFields.b1} />
          <Square onClick={handleClick} id="b2" mark={boardFields.b2} />
          <Square onClick={handleClick} id="b3" mark={boardFields.b3} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square onClick={handleClick} id="c1" mark={boardFields.c1} />
          <Square onClick={handleClick} id="c2" mark={boardFields.c2} />
          <Square onClick={handleClick} id="c3" mark={boardFields.c3} />
        </div>
      </div>
    </div>
  );
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
