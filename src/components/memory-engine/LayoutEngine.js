import { templates } from './templates';

/**
 * Intelligently chunks photos and assigns the best template for each chunk.
 * 
 * @param {Array} photos - The pre-analyzed photos.
 * @returns {Array} An array of page objects: { photos, template }
 */
export function generatePages(photos) {
  // A curated cinematic rhythm for number of photos per page.
  // We want to mix single hero shots with collages to create a breathing pace.
  const rhythm = [1, 2, 1, 3, 1, 2, 4];
  
  const pages = [];
  let currentIndex = 0;
  let rhythmIndex = 0;

  while (currentIndex < photos.length) {
    // Determine how many photos to take for this page
    let chunkSize = rhythm[rhythmIndex % rhythm.length];
    
    // If we're near the end, we might not have enough photos to fulfill the chunk
    if (currentIndex + chunkSize > photos.length) {
      chunkSize = photos.length - currentIndex;
    }

    // Extract the chunk
    const chunk = photos.slice(currentIndex, currentIndex + chunkSize);
    
    // Score all available templates for this chunk size
    let bestTemplate = null;
    let highestScore = -Infinity;

    for (const template of templates) {
      const score = template.score(chunk);
      if (score > highestScore) {
        highestScore = score;
        bestTemplate = template;
      }
    }

    // Fallback if no template scored well (shouldn't happen with our robust templates)
    if (!bestTemplate) {
      bestTemplate = templates.find(t => t.maxPhotos === chunk.length) || templates[0];
    }

    pages.push({
      id: `page-${pages.length}`,
      photos: chunk,
      template: bestTemplate,
    });

    currentIndex += chunkSize;
    rhythmIndex++;
  }

  return pages;
}
