import { react, useState, useEffect, useContext } from "react";
import axios from "axios";
import AniContext from "./Anime2";

const AnimeList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [value, setValue] = useState("");
  const [titleAnime, setTitleAnime] = useState("");
  // const [titleChara, setTitleChara] = useState("");
  const titleChara = useContext(AniContext);

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
          console.log(items);
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

  if (error) {
    return (
      <>
        <div className="text-md font-sans text-blue-300 mt-5 text-center ">
          Error: {titleAnime} can't found
        </div>
      </>
    );
  } else if (!isLoaded) {
    return (
      <>
        <div className="text-md font-sans text-blue-300 mt-5 text-center ">
          Loading...
        </div>
      </>
    );
  } else {
    return (
      <>
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

export default AnimeList;
