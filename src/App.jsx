import { useContext, useEffect } from "react";
import "./App.css";
import Cell from "./components/Cell";
import GuessRow from "./components/GuessRow";
import Header from "./components/Header";
import Message from "./components/Message";
import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { useLetters } from "./context/LettersContext";

function App() {
  const word = useRouteLoaderData("app");
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [tries, setTries] = useState(0);
  const { letters, setLetters } = useLetters();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        setGuess(guess.slice(0, -1));
      } else if (e.key === "Enter") {
        if (guess.length < 5) {
          setMessage("pas assez de lettres");
        } else {
          setTries(tries + 1);
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
      } else if (
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

  const handleSubmit = () => {
    if (guess.length < 5) {
      setMessage("pas assez de lettres");
    } else {
      setTries(tries + 1);
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
          {Object.keys(letters).map((keyName, keyIndex) => (
            <Cell
              letter={keyName}
              key={keyName}
              color={letters[keyName]}
              setGuess={setGuess}
              guess={guess}
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
