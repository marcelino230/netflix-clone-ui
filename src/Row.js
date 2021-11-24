import React, { useState, useEffect } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [Movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  // Snippit of code that runns based on spesific condition
  useEffect(
    () => {
      async function fetchData() {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        // console.log(request.data.results);
        return request;
      }
      fetchData();
    },
    // if [empty] run once and don't run it again
    // loads every time the external variable "fetchUrl" changes
    [fetchUrl]
  );

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(Movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2 className="row_title">{title}</h2>
      <div className="row_posters">
        {/* several row posters */}

        {Movies.map((Movie) => (
          //Key makes loading faster by
          <img
            key={Movie.id}
            onClick={() => handleClick(Movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? Movie.poster_path : Movie.backdrop_path
            }`}
            alt={Movie.name}
          />
        ))}
      </div>
      {/* Add youtube trailer */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
