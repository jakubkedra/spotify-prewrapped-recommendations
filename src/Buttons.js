
import React from "react";
import './App.css';

export const Buttons = ({getUsersTopItems, logout, topArtists, getUserTopTracks, topTracks}) => {
    const displayTopArtists = () => {
        return topArtists.map((item)=> (
          <div key={item.id}>
            <div>{item.name}</div>
          </div>
        ))
      }
      const displayTopTracks = () => {
          return topTracks.map((item)=> (
            <div key={item.id}>
            <div>{item.name}</div>
          </div>
          ))
      }
    return(
        <div>
            <div>
            <div><a className='login' href="#" onClick={getUsersTopItems}>Top Artists</a></div><br/>
            <div><a className='login' href="#" onClick={getUserTopTracks}>Top Tracks</a></div><br/>
            <div><a className='login' href="#" onClick={logout}>Log out</a></div><br/>
            </div><br/>
            <div className="column">{displayTopArtists()}</div>
            <div className="column">{displayTopTracks()}</div>
        </div>
        
    );
}