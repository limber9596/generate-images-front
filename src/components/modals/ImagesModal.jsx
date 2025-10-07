import React, { useEffect, useState } from "react";
import "../../styles/ImagesModal.css";
import { useImageGenerator } from "../../context/ImageGenContext";

export default function ImagesModal({}) {
  const {
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
    setIsModalOpen,
    generateImageMask,
    isModalOpen,
    width,
    heigth,
    resizedImage,
    setResizedImage,
  } = useImageGenerator();

  useEffect(() => {
    if (width && heigth) {
      console.log("Dimensiones desde imagenModal:", width, heigth);
    }
  }, [width, heigth]);

  useEffect(() => {
    if (!imageUrl || !width || !heigth) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; // por si la imagen viene de otra URL
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width; // tamaño deseado
      canvas.height = heigth; // tamaño deseado

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const newImageUrl = canvas.toDataURL("image/png");
      setResizedImage(newImageUrl); // ya la imagen con la proporción correcta
    };
  }, [imageUrl, width, heigth]);
  //////////////////////////////////////////////

  if (!isModalOpen) return null;
  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* botón cerrar */}

        {!resizedImage && (
          <button className="close-button" onClick={handleClose}>
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
            {resizedImage && (
              <>
                <img
                  src={resizedImage}
                  alt="Generada"
                  className="generated-image"
                />
                <div className="generate-box-buttons">
                  <button
                    onClick={() => downloadImage(resizedImage)}
                    className="download-button"
                  >
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
                      handleClose();
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
        {!resizedImage && (
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
