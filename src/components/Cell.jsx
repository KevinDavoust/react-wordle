/* eslint-disable react/require-default-props */
import PropTypes from "prop-types";

function Cell({ letter, color, guess, setGuess, isWin }) {
  const handleClick = (letter) => {
    if (!isWin && guess.length < 5) {
      setGuess(guess + letter);
    }
  };
  return (
    <div className={`cell ${color}`} onClick={() => handleClick(letter)}>
      {letter && letter.toUpperCase()}
    </div>
  );
}

Cell.propTypes = {
  color: PropTypes.string,
  guess: PropTypes.string,
  letter: PropTypes.string,
  setGuess: PropTypes.func,
  isWin: PropTypes.bool,
};

export default Cell;
