import React, { useState } from 'react';
import VideoItem from './VideoItem';

const VideoPlaylist = ({ playListVideos, setVideo }) => {
  const [sortedVideos, setSortedVideos] = useState(playListVideos);

  const sortVideosByTitle = () => {
    const sorted = [...sortedVideos].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    setSortedVideos(sorted);
  };

  return (
    <div>
      <h2 style={{marginLeft: '10px'}}>Video Play List</h2>
      <button style={{marginLeft: '10px'}} onClick={sortVideosByTitle}>Sort On Title</button>
      {sortedVideos.map((playListVideo, index) => (
        <VideoItem key={index} playListVideo={playListVideo} setVideo={setVideo}/>
      ))}
    </div>
  );
};

export default VideoPlaylist;
