import React from 'react';
import '../css/videoItem.css';

const VideoItem = ({ playListVideo, setVideo }) => {
  const trimDescription = (text) => {
    return text.slice(0, 100)
  }
  return (
    <div className="video-item" onClick={() => setVideo(playListVideo)}>
      <video src={playListVideo.videoUrl} poster={playListVideo.thumbnailUrl} className="video-thumbnail">
      </video>
      <div className="video-info">
        <h3>{playListVideo.title}</h3>
        <p>{trimDescription(playListVideo.description)}...</p>
      </div>
    </div>
  );
};

export default VideoItem;
