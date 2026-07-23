import { useState, useEffect, useRef, useCallback } from 'react';
import { Howl, Howler } from 'howler';
import playlistData from '../data/playlist.json';

/**
 * Audio Engine
 * Manages the global Howler context, handles crossfading, volume control, and playback state.
 */
export function useAudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const howls = useRef({}); // Cache for loaded tracks

  // Initialize howler instance globally for volume control
  useEffect(() => {
    Howler.volume(isMuted ? 0 : 1);
  }, [isMuted]);

  // Lazy load and cache a track
  const getOrCreateHowl = (trackId) => {
    if (howls.current[trackId]) return howls.current[trackId];
    
    const trackInfo = playlistData.tracks.find(t => t.id === trackId);
    if (!trackInfo) return null;

    const howl = new Howl({
      src: [trackInfo.src],
      loop: true,
      volume: 0, // Starts at 0 for fade in
      html5: true, // Force HTML5 audio to allow playing large files before full load
      preload: true
    });

    howls.current[trackId] = {
      howl,
      maxVolume: trackInfo.volume,
      crossfadeDur: trackInfo.crossfade
    };
    return howls.current[trackId];
  };

  const playTrack = useCallback((trackId) => {
    const trackData = getOrCreateHowl(trackId);
    if (!trackData) return;

    if (currentTrackId && currentTrackId !== trackId) {
      crossfade(currentTrackId, trackId);
    } else {
      trackData.howl.play();
      trackData.howl.fade(0, trackData.maxVolume, 2000);
      setIsPlaying(true);
      setCurrentTrackId(trackId);
    }
  }, [currentTrackId]);

  const pauseTrack = useCallback(() => {
    if (!currentTrackId) return;
    const trackData = howls.current[currentTrackId];
    if (trackData) {
      trackData.howl.fade(trackData.howl.volume(), 0, 1000);
      setTimeout(() => trackData.howl.pause(), 1000);
    }
    setIsPlaying(false);
  }, [currentTrackId]);

  const crossfade = useCallback((oldId, newId) => {
    const oldTrack = getOrCreateHowl(oldId);
    const newTrack = getOrCreateHowl(newId);
    
    if (oldTrack) oldTrack.howl.fade(oldTrack.howl.volume(), 0, newTrack?.crossfadeDur || 2000);
    
    if (newTrack) {
      newTrack.howl.play();
      newTrack.howl.fade(0, newTrack.maxVolume, newTrack.crossfadeDur || 2000);
      setTimeout(() => {
        if (oldTrack) oldTrack.howl.stop();
      }, newTrack.crossfadeDur || 2000);
    }
    
    setCurrentTrackId(newId);
    setIsPlaying(true);
  }, []);

  const toggleMute = useCallback(() => setIsMuted(prev => !prev), []);

  const playSfx = useCallback((sfxId) => {
    if (isMuted) return;
    const src = playlistData.sfx[sfxId];
    if (src) {
      const sfx = new Howl({ src: [src] });
      sfx.play();
    }
  }, [isMuted]);

  return { isPlaying, isMuted, currentTrackId, playTrack, pauseTrack, toggleMute, playSfx };
}
