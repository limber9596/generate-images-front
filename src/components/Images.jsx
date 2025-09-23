// Images.jsx
import React from "react";
import "../styles/Images.css";

export default function Images({
  file,
  selectedImage,
  previewUrl,
  imageUrl,
  downloadImage,
  setFile,
  setSelectedImage,
  setPreviewUrl,
  setImageUrl,
  setPrompt,
}) {
  return (
    <div className="content-images">
      {/* ////// preview de imagen subida o seleccionada */}
      {(file || selectedImage) && (
        <div className="image-box">
          <img
            src={file ? previewUrl : selectedImage.src}
            alt={file ? file.name : selectedImage.alt}
          />
        </div>
      )}

      {/* ////// imagen generada */}
      <div className="image-box">
        {imageUrl && (
          <>
            <img src={imageUrl} alt="Generada" className="generated-image" />
            <div className="generate-box-buttons">
              <button onClick={downloadImage} className="download-button">
                Descargar
              </button>
              <button
                onClick={() => {
                  setFile(null);
                  setSelectedImage(null);
                  setPreviewUrl(null);
                  setImageUrl(null);
                  setPrompt("");
                }}
                className="reset-button"
              >
                Nuevo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
