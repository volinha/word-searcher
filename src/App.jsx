import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL ?? `https://api.datamuse.com`;

  const handleFetchResults = async (e, type) => {
    e.preventDefault();

    setTitle(word);

    await fetch(`${API_URL}/words?${type}=${word}&max=10`)
      .then((response) => response.json())
      .then(setResults)
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <div>
        <div className="form">
          <label htmlFor="word-input">Word: </label>
          <input
            required
            value={word}
            id="word-input"
            onChange={(e) => setWord(e.target.value)}></input>
        </div>
        <div className="buttons">
          <button onClick={(e) => handleFetchResults(e, "rel_syn")}>Synonyms</button>
          <button onClick={(e) => handleFetchResults(e, "rel_rhy")}>Rhymes</button>
          <button onClick={(e) => handleFetchResults(e, "sl")}>Sounds like</button>
          <button onClick={(e) => handleFetchResults(e, "ml")}>Similar meaning</button>
        </div>
      </div>
      <h2>{title}</h2>
      <ol className="words-list">
        {results.map((object) => (
          <li key={object.word}>
            {object.word}
          </li>
        ))}
      </ol>
      <footer className="footer">
        Powered by{" "}
        <a href="https://www.datamuse.com" target="_blank">
          Datamuse.com
        </a>{" "}
        API
      </footer>
    </div>
  );
}

export default App;
