import { react, useState, useEffect } from "react";

//* Create a fetch with react
const Fetch = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState("https://animechan.vercel.app/api/quotes");

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  useEffect(() => {
    if (props.link === "") {
      setUrl("https://animechan.vercel.app/api/quotes");
    } else {
      setUrl(
        `https://animechan.vercel.app/api/quotes/anime?title=${props.link}`
      );
    }
    console.log(url);
    fetch(url)
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
  }, [props, url]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        <div class="container">
          <div id="rower" class="row gy-3 justify-content-around">
            {items.map((item) => (
              <div
                class="p-2 card text-danger text-opacity-75 border-danger col-lg-3
                col-md-4
                col-sm-6
                col-xs-12"
                data-aos="flip-right"
                data-aos-easing="ease-out-cubic"
              >
                <div class="card-body">
                  <h4 class="card-title text-center mb-2 ">{item.character}</h4>
                  <h6 class="card-subtitle mb-4 text-center">
                    <small>{item.anime}</small>
                  </h6>
                  <hr />
                  <cite class="card-text mb-5">{item.quote}</cite>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ul>
    );
  }
};

export default Fetch;
