import React, { useState } from 'react';
import "../styles/photo-viewer.css";

const PhotoViewer = ({ thumbnailSrc, fullSrc, alt, vertical }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleViewer = () => {
    setIsOpen(true);
  };

  const closeViewer = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {vertical ? (
        <div className="photo-viewer-vertical">
          <img
            src={thumbnailSrc}
            alt={alt}
            className="thumbnailVertical"
            onClick={toggleViewer}
          />
          {isOpen && (
            <div className="viewer" onClick={closeViewer}>
              <span className="close">&times;</span>
              <img src={fullSrc} alt={alt} className="full-image" />
            </div>
          )}
        </div>
      ) : (
        <div className="photo-viewer">
          <img
            src={thumbnailSrc}
            alt={alt}
            className="thumbnail"
            onClick={toggleViewer}
          />
          {isOpen && (
            <div className="viewer" onClick={closeViewer}>
              <span className="close">&times;</span>
              <img src={fullSrc} alt={alt} className="full-image" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoViewer;