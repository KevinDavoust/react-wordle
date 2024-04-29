import PropTypes from "prop-types";
import Cell from "./Cell";

function GuessRow({ row }) {
  return (
    <section className="guessRow" key={row}>
      {Object.keys(row).map((keyName, keyIndex) => {
        const word = row[keyIndex].split(" ");
        return <Cell letter={word[0]} key={keyName} color={word[1]} />;
      })}
    </section>
  );
}

GuessRow.propTypes = {
  row: PropTypes.shape({ a: PropTypes.string }).isRequired,
};

export default GuessRow;
