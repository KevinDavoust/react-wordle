import { createContext, useContext, useState } from "react";

const LettersContext = createContext();

export function LettersProvider({ children }) {
  const [letters, setLetters] = useState({
    a: "lightgrey",
    b: "lightgrey",
    c: "lightgrey",
    d: "lightgrey",
    e: "lightgrey",
    f: "lightgrey",
    g: "lightgrey",
    h: "lightgrey",
    i: "lightgrey",
    j: "lightgrey",
    k: "lightgrey",
    l: "lightgrey",
    m: "lightgrey",
    n: "lightgrey",
    o: "lightgrey",
    p: "lightgrey",
    q: "lightgrey",
    r: "lightgrey",
    s: "lightgrey",
    t: "lightgrey",
    u: "lightgrey",
    v: "lightgrey",
    w: "lightgrey",
    x: "lightgrey",
    y: "lightgrey",
    z: "lightgrey",
  });

  return (
    <LettersContext.Provider value={{ letters, setLetters }}>
      {children}
    </LettersContext.Provider>
  );
}

export const useLetters = () => useContext(LettersContext);
