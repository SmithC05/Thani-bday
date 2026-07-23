import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Template Registry and Scoring
// ─────────────────────────────────────────────────────────────────────────────
// Each template defines:
// - id: unique identifier
// - name: human-readable name
// - maxPhotos: exact number of photos this template takes
// - score: function(photos) => number (higher is better fit)
// - render: a layout component describing how to place the PhotoFrames
// ─────────────────────────────────────────────────────────────────────────────

export const templates = [
  {
    id: 'HeroSingle',
    name: 'Hero Single',
    maxPhotos: 1,
    score: (photos) => {
      if (photos.length !== 1) return -1;
      // High score for 1 photo, especially if it has high priority
      let base = 50;
      if (photos[0].priority > 0) base += 50;
      return base;
    },
    // The render function defines CSS classes to wrap the PhotoFrames
    getStyles: () => [
      // Single photo takes up full container width/height max, centered
      "w-full h-full max-w-4xl max-h-[80vh] mx-auto p-4 md:p-12 flex items-center justify-center"
    ]
  },
  {
    id: 'DuoPortraits',
    name: 'Duo Portraits',
    maxPhotos: 2,
    score: (photos) => {
      if (photos.length !== 2) return -1;
      let score = 0;
      photos.forEach(p => {
        if (p.orientation === 'portrait') score += 50;
        else if (p.orientation === 'square') score += 20;
      });
      return score; // Max 100
    },
    getStyles: () => [
      "w-1/2 h-[70vh] pr-4", 
      "w-1/2 h-[70vh] pl-4 mt-12" // slight staggered offset
    ],
    getContainerStyle: () => "flex flex-row items-center justify-center w-full max-w-5xl mx-auto px-4"
  },
  {
    id: 'DuoLandscapes',
    name: 'Duo Landscapes',
    maxPhotos: 2,
    score: (photos) => {
      if (photos.length !== 2) return -1;
      let score = 0;
      photos.forEach(p => {
        if (p.orientation === 'landscape') score += 50;
        else if (p.orientation === 'square') score += 20;
      });
      return score; // Max 100
    },
    getStyles: () => [
      "w-full h-[40vh] mb-8 pr-12",
      "w-full h-[40vh] pl-12" // Staggered
    ],
    getContainerStyle: () => "flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 py-8"
  },
  {
    id: 'MixedTrio',
    name: 'Mixed Trio',
    maxPhotos: 3,
    score: (photos) => {
      if (photos.length !== 3) return -1;
      const landscapes = photos.filter(p => p.orientation === 'landscape').length;
      const portraits = photos.filter(p => p.orientation === 'portrait').length;
      if (landscapes === 1 && portraits >= 1) return 100;
      if (landscapes === 1) return 80;
      return 30; // Fallback
    },
    getStyles: (photos) => {
      // Find the landscape photo to put at top
      const landscapeIndex = photos.findIndex(p => p.orientation === 'landscape');
      const idx1 = landscapeIndex >= 0 ? landscapeIndex : 0;
      const others = [0, 1, 2].filter(i => i !== idx1);
      
      const styles = [];
      styles[idx1] = "col-span-2 w-full h-[45vh] mb-6";
      styles[others[0]] = "col-span-1 w-full h-[40vh] pr-3";
      styles[others[1]] = "col-span-1 w-full h-[40vh] pl-3 mt-8"; // stagger
      return styles;
    },
    getContainerStyle: () => "grid grid-cols-2 w-full max-w-4xl mx-auto px-4 py-4"
  },
  {
    id: 'ThreePortrait',
    name: 'Three Portraits',
    maxPhotos: 3,
    score: (photos) => {
      if (photos.length !== 3) return -1;
      const portraits = photos.filter(p => p.orientation === 'portrait').length;
      return portraits * 33; // Max 99
    },
    getStyles: () => [
      "w-1/3 h-[60vh] pr-4 mt-12",
      "w-1/3 h-[60vh] px-2", // Middle one higher
      "w-1/3 h-[60vh] pl-4 mt-12"
    ],
    getContainerStyle: () => "flex flex-row items-center justify-center w-full max-w-6xl mx-auto px-4"
  },
  {
    id: 'ClassicGrid',
    name: 'Classic Grid',
    maxPhotos: 4,
    score: (photos) => {
      if (photos.length !== 4) return -1;
      return 80; // Default good for 4 photos
    },
    getStyles: () => [
      "w-full h-[35vh] p-2",
      "w-full h-[35vh] p-2 mt-4",
      "w-full h-[35vh] p-2 -mt-4",
      "w-full h-[35vh] p-2"
    ],
    getContainerStyle: () => "grid grid-cols-2 grid-rows-2 w-full max-w-4xl mx-auto px-4"
  },
  {
    id: 'OverlapDuo',
    name: 'Overlap Duo',
    maxPhotos: 2,
    score: (photos) => {
      if (photos.length !== 2) return -1;
      return 60; // good fallback for any 2 photos
    },
    getStyles: () => [
      "absolute w-2/3 md:w-1/2 h-[50vh] md:h-[60vh] left-[5%] md:left-[15%] top-[10%] rotate-[-4deg] z-10",
      "absolute w-2/3 md:w-1/2 h-[50vh] md:h-[60vh] right-[5%] md:right-[15%] top-[25%] rotate-[3deg] z-20"
    ],
    getContainerStyle: () => "relative w-full h-[80vh] max-w-5xl mx-auto"
  }
];
