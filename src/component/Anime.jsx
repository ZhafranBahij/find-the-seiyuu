import Fetching from "./Fetching";
import { react, useState, useEffect } from "react";
import axios from "axios";

const Anime = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [value, setValue] = useState("");
  const [titleAnime, setTitleAnime] = useState("");
  const [titleChara, setTitleChara] = useState("");

  const [idChara, setIdChara] = useState("");
  const [errorSeiyuu, setErrorSeiyuu] = useState(null);
  const [itemsSeiyuu, setItemsSeiyuu] = useState([]);
  const [isLoadedSeiyuu, setIsLoadedSeiyuu] = useState(false);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  const seiyuuFilter = (seiyuu) => {
    return seiyuu.language == "Japanese";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(
          `https://api.jikan.moe/v4/characters?letter=${titleChara}&order_by=favorites&sort=desc&limit=5`
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          // console.log(response.data.data);
          setIsLoaded(true);
          setItems(response.data.data);
          setError(null);

          // Nampung id chara
          setIdChara(response.data.data[0].mal_id);
        })
        .catch(function (error) {
          // handle error
          setIsLoaded(true);
          setError(error);
          console.log(error);
        });
    }, 400);
    return () => clearTimeout(timer);
  }, [titleChara]);

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/characters/${idChara}/voices`)
      .then(function (response) {
        // handle success
        // console.log(response);
        // console.log(response.data.data);
        setIsLoadedSeiyuu(true);
        setItemsSeiyuu(response.data.data.filter(seiyuuFilter));
      })
      .catch(function (error) {
        // handle error
        setIsLoadedSeiyuu(true);
        setErrorSeiyuu(error);
        // console.log(error);
      });
  }, [idChara]);

  const handleChange = (event) => {
    setValue(event.target.value);
    setTitleChara(event.target.value);
  };

  const handleSubmit = (event) => {
    setTitleAnime(value);
    console.log(items);
    event.preventDefault();
  };

  const clickChara = (value) => {
    setTitleAnime(value);
  };

  if (error) {
    return (
      <div className=" min-h-screen bg-neutral-800 flex flex-col justify-center items-center">
        <h1 className="mb-10 text-4xl sm:text-5xl text-transparent font-title font-bold bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
          Find The Seiyuu
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="form-input px-4 py-3 rounded-full "
            placeholder="ex. Kasumi Toyama"
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
        <div className="text-md font-sans text-blue-300 mt-5 text-center ">
          Error: {titleAnime} can't found
        </div>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className=" min-h-screen bg-neutral-800 flex flex-col justify-center items-center">
        <h1 className="mb-10 text-4xl sm:text-5xl text-transparent font-title font-bold bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
          Find The Seiyuu
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="form-input px-4 py-3 rounded-full "
            placeholder="ex. Kasumi Toyama"
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
        <div className="text-md font-sans text-blue-300 mt-5 text-center ">
          Loading...
        </div>
      </div>
    );
  } else {
    return (
      <div className=" min-h-screen bg-neutral-800 flex flex-col justify-center items-center">
        <h1 className="mb-10 text-4xl sm:text-5xl text-transparent font-title font-bold bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
          Find The Seiyuu
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="form-input px-4 py-3 rounded-full focus:outline-none focus:ring focus:ring-sky-400"
            placeholder="ex. Kasumi Toyama"
            onChange={handleChange}
            value={value}
          />
          <button
            type="submit"
            className="mx-2 px-5 py-3 bg-indigo-700 rounded-full text-white hover:bg-indigo-800  active:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-300 text-sm"
          >
            Search
          </button>
        </form>
        <div>
          <ul className="my-10 flex gap-2">
            {items.map((item) => (
              <li
                key={item.mal_id}
                className="bg-sky-600 text-white py-2 px-4 my-2 rounded-xl"
              >
                <a
                  href={item.url}
                  target="_blank"
                  className="block text-center"
                >
                  {item.name}
                </a>
                <a
                  href={item.url}
                  target="_blank"
                  className="flex justify-center"
                >
                  <img
                    src={item.images.jpg.image_url}
                    alt=""
                    className="w-28"
                  />
                </a>
              </li>
            ))}
          </ul>
          <ul className="my-10 flex gap-2">
            {itemsSeiyuu.map((item) => (
              <li
                key={item.person.name}
                className="bg-red-600 text-white py-2 px-4 my-2 rounded-xl"
              >
                <a href={item.person.url} target="_blank">
                  {item.person.name}
                </a>
                <a
                  href={item.person.url}
                  target="_blank"
                  className="flex justify-center"
                >
                  <img
                    src={item.person.images.jpg.image_url}
                    alt="Seiyuu"
                    className="w-28"
                  />
                </a>
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
