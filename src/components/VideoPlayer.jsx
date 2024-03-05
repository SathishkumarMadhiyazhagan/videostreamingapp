import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaExpand, FaCompress, FaBackward, FaForward, FaVolumeUp, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';
import '../css/videoPlayer.css';

const VideoPlayer = ({ video }) => {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const volumeInputRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showVolumeInput, setShowVolumeInput] = useState(false);


  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setCurrentTime(0);
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
    };
  }, [video]);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  const handleSpeedChange = (value) => {
    videoRef.current.playbackRate = value;
    setSpeed(value);
  };

  const handleJumpForward = () => {
    videoRef.current.currentTime += 5;
  };

  const handleJumpBackward = () => {
    videoRef.current.currentTime -= 5;
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume === '0') setIsMuted(true);
    else setIsMuted(false);
  };

  const handleMute = () => {
    if (isMuted) {
      videoRef.current.volume = volume;
      setVolume(volume);
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setVolume(0);
      setIsMuted(true);
      setShowVolumeInput(true);
    }
  };

  const handleVolumeInputBlur = () => {
    setShowVolumeInput(false);
  };

  const handleSpeedOptionClick = (value) => {
    handleSpeedChange(value);
    setShowSpeedOptions(false);
  };

  const speedOptions = [1, 1.25, 1.5, 1.75, 2];
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div> {video && (
      <>
      <div className="video-container" onMouseEnter={() => setShowControls(true)}
    onMouseLeave={() => setShowControls(false)}>
      <video
        ref={videoRef}
        controls={false}
        src={video.videoUrl}
        autoPlay
        onDoubleClick={handleFullScreen}
        onClick={togglePlayPause}
        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '20px' }}
      >
      </video>
      {showControls && (
      <div className="video-controls" ref={controlsRef}>
        <div className="video-row">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => {
              videoRef.current.currentTime = e.target.value;
              setCurrentTime(e.target.value);
            }}
            className="video-time-input"
          />
          {duration > 0 && (
            <div className="video-time-indicator">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          )}
        </div>
        <div className="video-row">
          <button onClick={togglePlayPause}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
          <button onClick={handleJumpBackward}><FaBackward /></button>
          <button onClick={handleJumpForward}><FaForward /></button>
          <button onClick={() => setShowSpeedOptions(!showSpeedOptions)}>{speed}x  </button>
          {showSpeedOptions && (
            <div className="video-speed-options">
              {speedOptions.map((option) => (
                <button key={option} onClick={() => handleSpeedOptionClick(option)}>{option}x</button>
              ))}
            </div>
          )}
          <button onClick={handleMute}>{isMuted ? <FaVolumeMute /> : volume > 0.5 ? <FaVolumeUp /> : <FaVolumeDown />}</button>
          {showVolumeInput && (
              <input
                ref={volumeInputRef}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                onBlur={handleVolumeInputBlur}
                className="volume-input-vertical"
              />
            )}
          <button onClick={handleFullScreen}>{isFullScreen ? <FaCompress /> : <FaExpand />}</button>
        </div>
      </div>
       )}
    </div>
    <div>
      <h3>{video.title}</h3>
      <p>{video.description}</p>
    </div>
    </>
    )}
    </div>
  );
};

export default VideoPlayer;
