import { react, useState, useEffect, useContext, createContext } from "react";
import AnimeList from "./AnimeList";

const Anime = () => {
  const [result, setResult] = useState("");
  const [titleAnime, setTitleAnime] = useState("");
  const [chara, setChara] = useState("");

  const AniContext = createContext(chara);
  useEffect(() => {
    setChara(result);
    console.log(result);
  }, result);

  const handleChange = (event) => {
    setResult(event.target.value);
    console.log(result);
  };

  const handleSubmit = (event) => {
    setTitleAnime(value);
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          className="form-input px-4 py-3 rounded-full "
          placeholder="e.g. Kasumi Toyama"
          onChange={handleChange}
          value={result}
        />
        <button
          type="submit"
          className="mx-2 px-5 py-3 bg-indigo-700 rounded-full text-white hover:bg-indigo-900 text-sm"
        >
          Search
        </button>
      </form>
      <AniContext.Provider value={chara}>
        <AnimeList />
      </AniContext.Provider>
    </>
  );
};

export default Anime;
