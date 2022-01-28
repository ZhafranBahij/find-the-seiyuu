import Fetching from "./Fetching";
import { react, useState, useEffect } from "react";
import axios from "axios";

const Anime = () => {
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [titleAnime, setTitleAnime] = useState("");

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime?letter=${titleAnime}`)
      .then(function (response) {
        // handle success
        console.log(response);
        console.log(response.data);
        setItems(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, titleAnime);

  const handleSubmit = (event) => {
    setTitleAnime(value);
    event.preventDefault();
  };

  return (
    <div className="h-screen bg-gradient-to-r from-sky-800 via-blue-700 to-sky-800 flex flex-col justify-center items-center">
      <h1 className="mb-10 text-5xl text-transparent font-title font-bold bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
        Anime Gan
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          className="form-input px-4 py-3 rounded-full"
          placeholder="ex. Death Note"
        />
        <button type="submit"></button>
      </form>
      <div>
        <ul>
          {/* {items.map((item) => (
            <li
              key={item.id}
              className="list-inside bg-emerald-400 my-5 px-8 py-4 rounded-2xl hover:bg-emerald-700 hover:text-white"
            >
              {item.anime}
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default Anime;
