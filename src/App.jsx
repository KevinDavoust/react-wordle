import { useContext, useEffect } from "react";
import "./App.css";
import Cell from "./components/Cell";
import GuessRow from "./components/GuessRow";
import Header from "./components/Header";
import Message from "./components/Message";
import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { useLetters } from "./context/LettersContext";
import slugify from "react-slugify";

function App() {
  const word = slugify(useRouteLoaderData("app"));
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [tries, setTries] = useState(0);
  const { letters, setLetters } = useLetters();

  const handleSubmit = () => {
    if (guess.length < 5) {
      !isWin && setMessage("pas assez de lettres");
    } else {
      !isWin && setTries(tries + 1);
      const arr = [...guesses];
      const object = {};
      guess.split("").map((letter, index) => {
        if (letter === word[index]) {
          object[index] = `${letter} green`;
          setLetters((prevLetters) => ({
            ...prevLetters,
            [letter]: `green`,
          }));
        } else if (word.includes(letter)) {
          object[index] = `${letter} yellow`;
          if (letters[letter] !== "green") {
            setLetters((prevLetters) => ({
              ...prevLetters,
              [letter]: `yellow`,
            }));
          }
        } else {
          object[index] = `${letter} grey`;
          setLetters((prevLetters) => ({
            ...prevLetters,
            [letter]: `grey`,
          }));
        }
        return object;
      });
      arr.push(object);
      setGuesses(arr);
      setGuess("");
      if (guess === word) {
        setMessage("Bravo victoire");
        setIsWin(true);
      }
    }
  };

  const handleDeleteLastLetter = () => {
    setGuess(guess.slice(0, -1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        handleDeleteLastLetter();
      } else if (e.key === "Enter") {
        handleSubmit();
      } else if (
        !isWin &&
        guess.length < 5 &&
        e.key.length === 1 &&
        e.key.match(/[a-z]/)
      ) {
        setGuess(guess + e.key);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess, guesses, word, letters, tries]);

  return (
    <>
      <main className="mainContainer">
        <Header />
        {tries > 0 && <p>Nombre d&apos;essais : {tries}</p>}
        <Message message={message} />
        <section className="guessContainer">
          {guesses && guesses.map((row) => <GuessRow row={row} key={row} />)}
        </section>
        {!isWin && (
          <section className="guessRow guess-typing-row">
            {[...Array(5)].map((value, index) => (
              <Cell letter={guess[index]} key={Math.random()} />
            ))}
          </section>
        )}
        <section className="letters">
          {Object.keys(letters).map((keyName) => (
            <Cell
              letter={keyName}
              key={keyName}
              color={letters[keyName]}
              setGuess={setGuess}
              guess={guess}
              isWin={isWin}
            />
          ))}
          <button onClick={() => handleDeleteLastLetter()}>
            Supprimer dernière lettre
          </button>
        </section>
        <button onClick={() => handleSubmit()}>Deviner</button>
      </main>
    </>
  );
}

export default App;
