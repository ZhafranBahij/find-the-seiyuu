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
          console.log(titleChara);
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
    setTitleChara(event.target.value);
  };

  const handleSubmit = (event) => {
    setTitleAnime(titleChara);
    console.log(items);
    event.preventDefault();
  };

  if (error) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="form-input px-4 py-3 rounded-full "
            placeholder="e.g. Kasumi Toyama"
            onChange={handleChange}
            value={titleChara}
          />

          <button
            type="submit"
            className="mx-2 px-5 py-3 bg-indigo-700 rounded-full text-white hover:bg-indigo-900 text-sm"
          >
            Search
          </button>
        </form>
        <div className="text-md font-sans text-blue-300 mt-5 text-center ">
          Error: {titleChara} can't found
        </div>
      </>
    );
  } else if (!isLoaded) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="form-input px-4 py-3 rounded-full "
            placeholder="e.g. Kasumi Toyama"
            onChange={handleChange}
            value={titleChara}
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
      </>
    );
  } else {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="form-input px-4 py-3 rounded-full focus:outline-none focus:ring focus:ring-sky-400"
            placeholder="e.g. Kasumi Toyama"
            onChange={handleChange}
            value={titleChara}
          />
          <button
            type="submit"
            className="mx-2 px-5 py-3 bg-indigo-700 rounded-full text-white hover:bg-indigo-800  active:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-300 text-sm"
          >
            Search
          </button>
        </form>
        <div>
          <ul className="my-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {items.map((item) => (
              <li
                key={item.mal_id}
                className="bg-sky-600 text-white py-2 px-4 my-2 rounded-xl flex gap-2"
              >
                {/* <div
                  className="h-20 w-20 rounded-full  bg-center "
                  style={{ background: `url(${item.images.jpg.image_url})` }}
                ></div> */}
                <img src={item.images.jpg.image_url} className="w-10" />
                <h5 className="flex justify-center">{item.name}</h5>
              </li>
            ))}
          </ul>
          <ul className="my-10 flex flex-col sm:flex-row gap-2">
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
      </>
    );
  }
};

export default Anime;
