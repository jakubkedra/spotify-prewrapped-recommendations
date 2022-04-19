import React from "react";
import "./App.css";
import { useEffect, useState } from "react";

export const Buttons = ({
  getUsersTopItems,
  logout,
  topArtists,
  getUserTopTracks,
  topTracks,
}) => {
  const displayTopArtists = () => {
    return topArtists.map((item) => (
      <div key={item.id}>
        <div>{item.name}</div>
      </div>
    ));
  };
  const displayTopTracks = () => {
    return topTracks.map((item) => (
      <div key={item.id}>
        <div>
          {item.artists[0].name} - {item.name}{" "}
          <a className="similar" href="#" onClick={(e) => {
            getSimilar(e, item.artists[0].name, item.name)
          }}>
            Get Simillar
          </a>
        </div>
      </div>
    ));
  };
  const [similar, setSimilar] = useState([]);
  
  const getSimilar = async (e,artist, track) => {
    e.preventDefault();
    artist = artist.replace(/\s/g, '+');
    track = track.replace(/\s/g, '+');
    const url = "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist="+artist+"&track="+track+"&api_key=a7c06d5ca59a1e9a95874b2af907ab8e&format=json";
    const response = await fetch(url);
    const data = await response.json();
    setSimilar(data.similartracks.track);
  }
  const displaySimilarTracks = () => {
    return similar.map((item) => (
      <div key={item.match}>
        {item.artist.name} - {item.name} - <a className="match">{item.match}</a>
      </div>
    ));
  };
  return (
    <div>
      <div className="row">
      <a className="login" href="#" onClick={getUsersTopItems}>
            Top Artists
          </a>
        
          <a className="login" href="#" onClick={getUserTopTracks}>
            Top Tracks
          </a>
        
          <a className="login" href="#" onClick={logout}>
            Log out
          </a>
        
      </div>
      <br /><br /><br />
      <div className="row">
        <div className="column">{displayTopArtists()}</div>
        <div className="column">{displayTopTracks()}</div>
        <div className="column">{displaySimilarTracks()}</div>
      </div>
    </div>
  );
};
