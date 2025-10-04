import React from "react";
import "../../styles/ImagesModal.css";

export default function ImagesModal({
  file,
  selectedImage,
  previewUrl,
  imageUrl,
  downloadImage,
  setFile,
  setSelectedImage,
  setPreviewUrl,
  setImageUrl,
  setPromptMask,
  promptMask,
  setPromptText,
  promptText,
  isOpen,
  onClose,
  generateImageMask,
}) {
  if (!isOpen) return null; // si el modal está cerrado no renderiza nada

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* botón cerrar */}

        {!imageUrl && (
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        )}
        <div className="content-images">
          {/* ////// preview de imagen subida o seleccionada */}
          {(file || selectedImage) && (
            <div className="image-box preview-img">
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
                <img
                  src={imageUrl}
                  alt="Generada"
                  className="generated-image"
                />
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
                      setPromptText("");
                      setPromptMask("");
                      onClose();
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
        {!imageUrl && (
          <button
            onClick={() =>
              generateImageMask({
                promptMask,
                file,
                selectedImage,
                setImageUrl,
              })
            }
            className="generate-button"
          >
            Generar
          </button>
        )}
      </div>
    </div>
  );
}
