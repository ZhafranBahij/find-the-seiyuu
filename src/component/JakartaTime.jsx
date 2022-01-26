import Fetching from "./Fetching";
import { react, useState, useEffect } from "react";

const JakartaTime = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://animechan.vercel.app/api/quotes")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <div className="h-screen bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-800 flex flex-col justify-center items-center">
      <h1 className="mb-10 text-5xl text-transparent font-title font-bold bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
        Time To Pray
      </h1>
      <div>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.anime} {item.quote}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JakartaTime;
