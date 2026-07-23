import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoFrame } from './PhotoFrame';

export function MemoryPage({ pageData, isVisible }) {
  if (!pageData) return null;

  const { photos, template } = pageData;
  const containerStyle = template.getContainerStyle ? template.getContainerStyle() : "flex flex-wrap items-center justify-center w-full h-full p-4";
  const styles = template.getStyles(photos);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <div className={containerStyle}>
            {photos.map((photo, i) => (
              <PhotoFrame
                key={photo.id || i}
                photo={photo}
                className={styles[i] || "w-full h-full"}
                index={i}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
