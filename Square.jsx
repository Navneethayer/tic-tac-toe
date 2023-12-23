import React, { useState } from "react";
import "./Square.css";

function Sqbtn({ value, onSqClick }) {
  return (
    <>
      <button className="Sq" onClick={onSqClick}>
        <h4>{value}</h4>
      </button>
    </>
  );
}
const Square = () => {
  let n = 5;
  const [Sq, setSq] = useState(() => Array(n).fill(Array(n).fill(null)));
  const [xNext, setxNext] = useState(true);
  const [boards, setBoards] = useState([Sq]);
  const [index, setIndex] = useState(0);

  function onClick(i, j) {
    const nextsq = Sq.map((row) => [...row]);

    if (Sq[i][j] || CalWinner(Sq)) {
      return;
    }

    console.log(nextsq[i][j]);

    if (xNext) {
      nextsq[i][j] = "x";
    } else {
      nextsq[i][j] = "o";
    }
    console.log(nextsq);

    setSq(nextsq);
    setxNext(!xNext);
    setBoards((boards) => [...boards, nextsq]);
    setIndex(index + 1);
  }

  function goBack() {
    if (index > 0) {
      setIndex(() => {
        const newIndex = index - 1;
        console.log(newIndex);
        setSq(boards[newIndex]);
        return newIndex;
      });
    }
  }
  function redo() {
    
    setIndex(() => {
      const newIndex = index + 1;
      setSq(boards[newIndex]);
      return newIndex;
    });
  
  }

  const winner = CalWinner(Sq);
  let Player;
  if (winner) {
    Player = "winner: " + winner;
  } else {
    Player = "Next Player: " + (xNext ? "x" : "o");
  }

  return (
    <>
      <div className="Player">{Player}</div>
      <button className="bg-btn" onClick={goBack}>Back</button>
<div className="boxes">
{Array(n)
        .fill(1)
        .map((_, i) => {
          return (
            <div className="flex" key={i}>
              {Array(n)
                .fill(1)
                .map((_, j) => {
                  return (
                    <Sqbtn
                      key={j}
                      value={Sq[i][j]}
                      onSqClick={() => onClick(i, j)}
                    />
                  );
                })}
            </div>
          );
        })}
</div>
      <button className="bg-btn" onClick={redo}>Redo</button>
    </>
  );
  function CalWinner(Sq) {
    const n = Sq.length;

    for (let i = 0; i < n; i++) {
      if (Sq[i][0] && Sq[i].every((val) => val === Sq[i][0])) {
        return Sq[i][0];
      }
      for (let j = 0; j < n; j++) {
        if (Sq[i][j] == Sq[0][j]) {
          let isColumnSame = true;
          for (let i = 1; i < n; i++) {
            if (Sq[i][j] !== Sq[0][j]) {
              isColumnSame = false;
              break;
            }
          }
          if (isColumnSame && Sq[0][j]) {
            return Sq[0][j];
          }
        }
      }
    }


    let isMainDiagonalSame = true;
  for (let i = 1; i < n; i++) {
    if (Sq[i][i] !== Sq[0][0]) {
      isMainDiagonalSame = false;
      break;
    }
  }
  if (isMainDiagonalSame && Sq[0][0]) {
    return Sq[0][0];
  }

  // Check anti-diagonal
  let isAntiDiagonalSame = true;
  for (let i = 1; i < n; i++) {
    if (Sq[i][n - 1 - i] !== Sq[0][n - 1]) {
      isAntiDiagonalSame = false;
      break;
    }
  }
  if (isAntiDiagonalSame && Sq[0][n - 1]) {
    return Sq[0][n - 1];
  }




    return null; // No winner yet
  }
};

export default Square;
