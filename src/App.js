import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { Buttons } from "./Buttons";

function App() {
  const CLIENT_ID = "022dbe107b144d8892b305cfc32283ad";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-top-read+playlist-read-private+playlist-modify-public+playlist-modify-private";

  const [token, setToken] = useState("");
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    // getToken()

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const getUsersTopItems = async (event) => {
    event.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setTopArtists(data.items);
    console.log(topArtists);
  };

  const getUserTopTracks = async (event) => {
    event.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setTopTracks(data.items);
    console.log(topTracks);
  };

  return (
    <div className="App">
      {!token ? (
          <a className='login'
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login with Spotify
          </a>
        ) : (
          <Buttons getUsersTopItems={getUsersTopItems} logout={logout} topArtists={topArtists} getUserTopTracks={getUserTopTracks} topTracks={topTracks}/>
        )}

    </div>
  );
}

export default App;
