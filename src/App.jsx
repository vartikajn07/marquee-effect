import React, { useEffect, useState } from "react";
import useMousePosition from "./utils/useMousePosition";
import { motion, AnimatePresence } from "framer-motion";
import "@theme-toggles/react/css/Within.css";
import { Within } from "@theme-toggles/react";

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  const [albumCover, setAlbumCover] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isToggled, setToggle] = useState(false);
  const position = useMousePosition();
  //API access token
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch("/api/spotify-auth");
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  //custom-cursor and api requests
  const handleMouseEnter = async (songTitle) => {
    setIsHovered(true);
    if (accessToken) {
      // Search for the track
      const searchParameters = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      };
      const searchQuery = encodeURIComponent(songTitle);
      const searchUrl = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=1`;

      const response = await fetch(searchUrl, searchParameters);
      const data = await response.json();
      if (data.tracks.items.length > 0) {
        const track = data.tracks.items[0];

        setAlbumCover(track.album.images[0].url);
        setSpotifyUrl(track.external_urls.spotify);
      }
    }
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    setAlbumCover("");
  };
  const handleClick = () => {
    if (spotifyUrl) {
      window.open(spotifyUrl, "_blank");
    }
  };
  const handleTouchStart = (e) => {
    e.preventDefault(); // Prevent default touch action
    handleMouseEnter(e.currentTarget.textContent); // Show custom cursor
  };

  const handleTouchEnd = () => {
    handleMouseLeave(); // Hide custom cursor and redirect to Spotify
    if (spotifyUrl) {
      window.open(spotifyUrl, "_blank"); // Open the song in web version
    }
  };
  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent default mouse behavior during touch
  };
  //dark mode
  useEffect(() => {
    if (isToggled) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isToggled]);

  return (
    <div>
      <h1 class="heading">a simple marquee effect integrated w spotify API</h1>
      <h1 class="heading2">
        based on <a href="https://white-coffee.com/">white-coffee</a>
      </h1>
      <Within
        toggled={isToggled}
        toggle={setToggle}
        duration={750}
        style={{
          color: isToggled ? "white" : "#dea561", // Change text color based on the mode
        }}
        className="mode"
      />
      <div class="main">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          class="marquee"
          aria-hidden="true"
        >
          <div className="marquee__inner">
            {[
              "Pride,",
              "Life will be,",
              "My love mine all mine,",
              "Loyalty,",
              "West coast,",
              "Remain in me,",
              "Pride,",
              "Life will be,",
              "My love mine all mine,",
              "Loyalty,",
              "West coast,",
              "Remain in me,",
            ].map((songTitle, index) => (
              <h1
                key={index}
                onMouseEnter={() => handleMouseEnter(songTitle)}
                onClick={handleClick}
                onTouchStart={handleTouchStart} // For mobile touch start
                onTouchEnd={handleTouchEnd} // For mobile touch end
                onMouseDown={handleMouseDown} // Prevent mouse events from firing during touch
              >
                {songTitle}
              </h1>
            ))}
          </div>
          <div className="marquee__inner">
            {[
              "I wonder,",
              "United in grief,",
              "Thinking out loud,",
              "Self care,",
              "Say yes to heaven,",
              "Blue lights,",
              "I wonder,",
              "United in grief,",
              "Thinking out loud,",
              "Self care,",
              "Say yes to heaven,",
              "Blue lights,",
            ].map((songTitle, index) => (
              <h1
                key={index}
                onMouseEnter={() => handleMouseEnter(songTitle)}
                onClick={handleClick}
                onTouchStart={handleTouchStart} // For mobile touch start
                onTouchEnd={handleTouchEnd} // For mobile touch end
                onMouseDown={handleMouseDown} // Prevent mouse events from firing during touch
              >
                {songTitle}
              </h1>
            ))}
          </div>
          <div className="marquee__inner">
            {[
              "Hotel california,",
              "Royals,",
              "Smooth operator,",
              "Hold up,",
              "Nice for what,",
              "Too sweet,",
              "Hotel california,",
              "Royals,",
              "Smooth operator,",
              "Hold up,",
              "Nice for what,",
              "Too sweet,",
            ].map((songTitle, index) => (
              <h1
                key={index}
                onMouseEnter={() => handleMouseEnter(songTitle)}
                onClick={handleClick}
                onTouchStart={handleTouchStart} // For mobile touch start
                onTouchEnd={handleTouchEnd} // For mobile touch end
                onMouseDown={handleMouseDown} // Prevent mouse events from firing during touch
              >
                {songTitle}
              </h1>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="custom-cursor"
              style={{
                backgroundImage: `url(${albumCover})`,
                backgroundSize: "cover",
                left: `${position.x + 30}px`,
                top: `${position.y}px`,
                transition: "background-image 0.3s ease",
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 20,
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
