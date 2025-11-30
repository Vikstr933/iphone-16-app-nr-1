import React, { useState, useRef, useEffect } from 'react';
import './MusicApp.css';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverArt: string
}

interface MusicAppProps {
  onClose: () => void
}

const MusicApp: React.FC<MusicAppProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(234);
  const [volume, setVolume] = useState(0.7);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSong: Song = {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:54',
    coverArt: '🎵'
  };

  const playlist: Song[] = [
    currentSong,
    {
      id: '2',
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      duration: '3:23',
      coverArt: '🎶'
    },
    {
      id: '3',
      title: 'Save Your Tears',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: '3:35',
      coverArt: '🎵'
    },
    {
      id: '4',
      title: 'Good 4 U',
      artist: 'Olivia Rodrigo',
      album: 'SOUR',
      duration: '2:58',
      coverArt: '🎸'
    },
    {
      id: '5',
      title: 'Peaches',
      artist: 'Justin Bieber',
      album: 'Justice',
      duration: '3:18',
      coverArt: '🍑'
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isPlaying, duration]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value))
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
  };

  const handlePrevious = () => {
    setCurrentTime(0)
  };

  const handleNext = () => {
    setCurrentTime(0)
  };

  const toggleRepeat = () => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off'
    })
  };

  const toggleShuffle = () => {
    setShuffleEnabled(!shuffleEnabled)
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="music-app">
      <button className="music-app__close" onClick={onClose} aria-label="Stäng musik">
        ✕
      </button>

      <div className="music-app__content">
        <div className="music-app__header">
          <button className="music-app__minimize" aria-label="Minimera">
            <span className="music-app__chevron">⌄</span>
          </button>
          <div className="music-app__header-title">
            <div className="music-app__playing-from">Spelar från</div>
            <div className="music-app__source">Bibliotek</div>
          </div>
          <button className="music-app__more" aria-label="Mer">
            ⋯
          </button>
        </div>

        <div className="music-app__artwork-container">
          <div className="music-app__artwork">
            <div className="music-app__artwork-inner">
              <span className="music-app__cover-icon">{currentSong.coverArt}</span>
            </div>
          </div>
        </div>

        <div className="music-app__info">
          <div className="music-app__song-info">
            <h1 className="music-app__title">{currentSong.title}</h1>
            <h2 className="music-app__artist">{currentSong.artist}</h2>
          </div>
          <button className="music-app__favorite" aria-label="Favorit">
            ♡
          </button>
        </div>

        <div className="music-app__progress-section">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            className="music-app__progress-slider"
            style={{ background: `linear-gradient(to right, #FF3B30 0%, #FF3B30 ${progressPercentage}%, rgba(255, 255, 255, 0.2) ${progressPercentage}%, rgba(255, 255, 255, 0.2) 100%)` }}
            aria-label="Spårposition"
          />
          <div className="music-app__time-labels">
            <span className="music-app__time-current">{formatTime(currentTime)}</span>
            <span className="music-app__time-remaining">-{formatTime(duration - currentTime)}</span>
          </div>
        </div>

        <div className="music-app__controls">
          <button 
            className={`music-app__control-button music-app__shuffle ${shuffleEnabled ? 'music-app__control-button--active' : ''}`}
            onClick={toggleShuffle}
            aria-label="Blanda"
          >
            🔀
          </button>
          <button className="music-app__control-button music-app__previous" onClick={handlePrevious} aria-label="Föregående">
            ⏮
          </button>
          <button className="music-app__play-pause" onClick={handlePlayPause} aria-label={isPlaying ? 'Pausa' : 'Spela'}>
            {isPlaying ? '⏸' : '▶️'}
          </button>
          <button className="music-app__control-button music-app__next" onClick={handleNext} aria-label="Nästa">
            ⏭
          </button>
          <button 
            className={`music-app__control-button music-app__repeat ${repeatMode !== 'off' ? 'music-app__control-button--active' : ''}`}
            onClick={toggleRepeat}
            aria-label="Upprepa"
          >
            {repeatMode === 'one' ? '🔂' : '🔁'}
          </button>
        </div>

        <div className="music-app__volume-section">
          <button 
            className="music-app__volume-icon"
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            aria-label="Volym"
          >
            {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="music-app__volume-slider"
            style={{ background: `linear-gradient(to right, #FF3B30 0%, #FF3B30 ${volume * 100}%, rgba(255, 255, 255, 0.2) ${volume * 100}%, rgba(255, 255, 255, 0.2) 100%)` }}
            aria-label="Volymkontroll"
          />
          <button className="music-app__airplay" aria-label="AirPlay">
            📡
          </button>
        </div>

        <div className="music-app__queue">
          <div className="music-app__queue-header">
            <h3 className="music-app__queue-title">Nästa</h3>
          </div>
          <div className="music-app__queue-list">
            {playlist.slice(1).map((song) => (
              <div key={song.id} className="music-app__queue-item">
                <div className="music-app__queue-cover">
                  <span>{song.coverArt}</span>
                </div>
                <div className="music-app__queue-info">
                  <div className="music-app__queue-song">{song.title}</div>
                  <div className="music-app__queue-artist">{song.artist}</div>
                </div>
                <div className="music-app__queue-duration">{song.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default MusicApp;