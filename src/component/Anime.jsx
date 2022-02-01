import Fetching from "./Fetching";
import { react, useState, useEffect } from "react";
import axios from "axios";

const Anime = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [titleAnime, setTitleAnime] = useState("");

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  // letter=${titleAnime}

  // Link for find character
  // https://api.jikan.moe/v4/characters?letter=hinata&order_by=favorites&sort=desc&limit=10
  // https://animechan.vercel.app/api/quote

  useEffect(() => {
    axios
      .get(
        `https://api.jikan.moe/v4/characters?letter=${titleAnime}&order_by=favorites&sort=desc&limit=5`
      )
      .then(function (response) {
        // handle success
        // console.log(response);
        console.log(response.data.data);
        setIsLoaded(true);
        setItems(response.data.data);
      })
      .catch(function (error) {
        // handle error
        setIsLoaded(true);
        setError(error);
        console.log(error);
      });
  }, [titleAnime]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    setTitleAnime(value);
    console.log(items);
    event.preventDefault();
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className=" min-h-screen bg-neutral-800 flex flex-col justify-center items-center">
        <h1 className="mb-10 text-5xl text-transparent font-title font-bold bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
          Anime Gan
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="form-input px-4 py-3 rounded-full "
            placeholder="ex. Death Note"
            onChange={handleChange}
            value={value}
          />
          <button
            type="submit"
            className="mx-2 px-5 py-3 bg-indigo-700 rounded-full text-white hover:bg-indigo-900 text-sm"
          >
            Search
          </button>
        </form>
        <div>
          <ul className="my-10">
            {items.map((item) => (
              <li
                key={item.mal_id}
                className="bg-sky-600 text-white py-2 px-4 my-2 rounded-xl"
              >
                {item.name}
              </li>
            ))}
            {/* <li>{items[0]}</li> */}
          </ul>
        </div>
      </div>
    );
  }
};

export default Anime;
