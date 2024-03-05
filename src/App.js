import React, { useState } from 'react';
import './App.css'
import VideoPlayer from './components/VideoPlayer';
import VideoPlaylist from './components/VideoPlaylist';
import {PlayListVideos} from './video'

const App = () => {

  const [video, setVideo] = useState(PlayListVideos[0]);

  return (
    <>
    <h1 style={{textAlign:'center', margin:'10px'}}>Video Player App</h1>
    <div className='ContainerDiv' style={{margin: '20px 20px'}}>
      <div className='VideoPlayerDiv'>
        <VideoPlayer key={video} video={video} />
      </div>
      <div className='VideoPlayList'>
        <VideoPlaylist playListVideos={PlayListVideos} setVideo={setVideo} />
      </div>
    </div>
    </>
  );
}

export default App;
