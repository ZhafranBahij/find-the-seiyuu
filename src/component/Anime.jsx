import { react, useState, useEffect } from "react";
import axios from "axios";

const Anime = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [titleAnime, setTitleAnime] = useState("");
  const [titleChara, setTitleChara] = useState("");

  const [idChara, setIdChara] = useState("");
  const [errorSeiyuu, setErrorSeiyuu] = useState(null);
  const [itemsSeiyuu, setItemsSeiyuu] = useState([]);
  const [isLoadedSeiyuu, setIsLoadedSeiyuu] = useState(false);

  const [errorCharacter, setErrorCharacter] = useState(null);
  const [itemsCharacter, setItemsCharacter] = useState([]);
  const [isLoadedCharacter, setIsLoadedCharacter] = useState(false);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  const seiyuuFilter = (seiyuu) => {
    return seiyuu.language == "Japanese";
  };

  // for handle a character in datalist
  useEffect(() => {
    setIsLoaded(false);
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
          // console.log(titleChara);
          // Nampung id chara
          setIdChara(response.data.data[0].mal_id);
        })
        .catch(function (error) {
          // handle error
          setIsLoaded(true);
          setError(error);
          console.log(error);
        });
    }, 666);
    return () => clearTimeout(timer);
  }, [titleChara]);

  // To find a seiyuu from that character
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

  // To find a Character
  useEffect(() => {
    let idChar = idChara == "" ? 417 : idChara;
    axios
      .get(`https://api.jikan.moe/v4/characters/${idChar}`)
      .then(function (response) {
        // handle success
        // console.log(response);
        // console.log(response.data.data);
        setIsLoadedCharacter(true);
        setItemsCharacter(response.data.data);
      })
      .catch(function (error) {
        // handle error
        setIsLoadedCharacter(true);
        setErrorCharacter(error);
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
        <form onSubmit={handleSubmit} className="flex">
          <input
            id="searching"
            type="search"
            className="form-input px-4 py-3 text-sky-400 bg-transparent  border-0 border-b-4 border-sky-800 focus:border-sky-400 focus:outline-0"
            placeholder="e.g. Kasumi Toyama"
            onChange={handleChange}
            value={titleChara}
            list="character"
          />
          <datalist id="character">
            {items.map((item) => (
              <option key={item.mal_id}>{item.name}</option>
            ))}
          </datalist>
          {/* <button
            type="submit"
            className="mx-2 px-5 py-3 bg-indigo-700 rounded-full text-white hover:bg-indigo-800  active:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-300 text-sm"
          >
            Search
          </button> */}
        </form>
        <div className="text-md font-sans text-blue-300 mt-5 text-center ">
          {/* Error: {error} */}
          Not Found
        </div>
      </>
    );
  } else if (!isLoaded) {
    return (
      <>
        <form onSubmit={handleSubmit} className="flex">
          <input
            id="searching"
            type="search"
            className="form-input px-4 py-3 text-sky-400 bg-transparent border-0 border-b-4 border-sky-800 focus:border-sky-400 focus:outline-0"
            placeholder="e.g. Kasumi Toyama"
            onChange={handleChange}
            value={titleChara}
            list="character"
          />
          <datalist id="character">
            {items.map((item) => (
              <option key={item.mal_id}>{item.name}</option>
            ))}
          </datalist>
          {/* <button
            type="submit"
            className="mx-2 px-5 py-3 bg-indigo-700 rounded-full text-white hover:bg-indigo-800  active:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-300 text-sm"
          >
            Search
          </button> */}
        </form>
        <div className="text-md font-sans text-blue-300 mt-5 text-center ">
          Loading...
        </div>
      </>
    );
  } else {
    return (
      <>
        <form onSubmit={handleSubmit} className="flex">
          <input
            id="searching"
            type="search"
            className="form-input px-4 py-3 text-sky-400 bg-transparent border-0 border-b-4 border-sky-800 focus:border-sky-400 focus:outline-0"
            placeholder="e.g. Kasumi Toyama"
            onChange={handleChange}
            value={titleChara}
            list="character"
          />
          <datalist id="character" className="overflow-y-auto max-h-8">
            {items.map((item) => (
              <option key={item.mal_id}>{item.name}</option>
            ))}
          </datalist>
          {/* <button
            type="submit"
            className="mx-2 px-5 py-3 bg-indigo-700 rounded-full text-white hover:bg-indigo-800  active:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-300 text-sm"
          >
            Search
          </button> */}
        </form>
        <div>
          <ul className="my-10 flex flex-col sm:flex-row gap-2">
            <li
              key={itemsCharacter.mal_id}
              className="bg-sky-600 text-white py-2 px-4 my-2 rounded-xl"
            >
              <a href={itemsCharacter.url} target="_blank">
                {itemsCharacter.name}
              </a>
              <a
                href={itemsCharacter.url}
                target="_blank"
                className="flex justify-center"
              >
                <img
                  src={itemsCharacter.images.jpg.image_url}
                  alt="Character"
                  className="w-28"
                />
              </a>
            </li>

            {/* <li>{items[0]}</li> */}
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
