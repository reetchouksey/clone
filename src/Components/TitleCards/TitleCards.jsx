import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./TitleCards.css";
import jsonFile from "./jsonFile.json";

const TitleCards = ({
  title = "Popular on Netflix",
  category = "now_playing",
}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);
  const INLINE_FALLBACK =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzIzMjMyMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZjdmN2Y3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=";
  const handleWheel = useCallback((event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTk3NzZhYzc2ZDZjNWUyZGRkOTdkZjYzNTI2YzkxZSIsIm5iZiI6MTc2MjQxMTk2Ny45NzUwMDAxLCJzdWIiOiI2OTBjNDViZjg0Y2EyYTAzYzNkNzM4MDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iTip_MpiJ052f6gvzyhyhhFUV4OKacHPA6QyF5XzZQo",
          },
        };

        const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1&region=US`;

        console.log("Fetching movies from URL:", url);

        const response = await fetch(url, options);
        console.log("Response status:", response.status);

        const data = await response.json();
        console.log("Response data:", data || jsonFile);

        if (data.results && data.results.length > 0) {
          setApiData(data.results);
        } else {
          console.warn("No results found in API response:", data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchMovies();

    const cardsElement = cardsRef.current;
    if (cardsElement) {
      cardsElement.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (cardsElement) {
        cardsElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category, handleWheel]);

  return (
    <div className="background-container">
      <div className="titlecards">
        <h2>{title}</h2>
        <div className="card-list" ref={cardsRef}>
          {apiData.length > 0 ? (
            apiData.map((card) => (
              <Link to={`/player/${card.id}`} className="card" key={card.id}>
                <img
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
                  alt={card.original_title || "Movie"}
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.dataset.fallbackApplied = "true";
                    img.onerror = null;
                    img.src = INLINE_FALLBACK;
                  }}
                />
                <p>{card.original_title}</p>
              </Link>
            ))
          ) : (
            <p>Loading movies...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleCards;
