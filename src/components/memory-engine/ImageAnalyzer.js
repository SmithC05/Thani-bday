export async function analyzeImages(photos) {
  const analyzedPhotos = await Promise.all(
    photos.map(async (photo) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          const aspectRatio = width / height;
          
          let orientation = 'square';
          // Define a tolerance for squareness (e.g. 0.95 to 1.05)
          if (aspectRatio > 1.05) {
            orientation = 'landscape';
          } else if (aspectRatio < 0.95) {
            orientation = 'portrait';
          }

          resolve({
            ...photo,
            width,
            height,
            aspectRatio,
            orientation,
          });
        };
        img.onerror = () => {
          // Fallback if image fails to load
          resolve({
            ...photo,
            width: 800,
            height: 800,
            aspectRatio: 1,
            orientation: 'square',
          });
        };
        img.src = photo.url;
      });
    })
  );
  return analyzedPhotos;
}
