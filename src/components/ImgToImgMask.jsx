import React, { useState, useEffect } from "react";
import { useLoading } from "../context/LoadingContext";
import { useMessage } from "../context/MessageContext";
import axios from "axios";

export default function ImgToImgMask({
  prompt,
  setPrompt,
  file,
  setFile,
  setSelectedImage,
  selectedImage,
  previewUrl,
  setPreviewUrl,
  inputRef,
  imageUrl,
  setImageUrl,
}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  // const [imageSrc, setImageSrc] = useState(null);
  // const [imageUrl, setImageUrl] = useState("./exa.png");

  const { setLoading } = useLoading();
  const { showMessage } = useMessage();

  ///////////////////////////////////////////////
  const generateImageMask = async () => {
    setLoading(true);
    if (!prompt) return showMessage("Escribe un prompt");
    if (!file && !selectedImage) return showMessage("Debes subir una imagen");
    setImageUrl("");

    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      if (file) {
        formData.append("boceto", file); // archivo subido
      } else if (selectedImage) {
        const response = await fetch(selectedImage.src);
        const blob = await response.blob();
        const fakeFile = new File([blob], selectedImage.alt + ".png", {
          type: blob.type,
        });
        formData.append("boceto", fakeFile);
      }

      const response = await axios.post(
        `${apiUrl}/generate-image-mask`,
        formData, // aquí va directo el formData
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;
      console.log("Respuesta del backend:", data);

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        alert("Error generando imagen con máscara");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        showMessage(error.response.data.msg);
      } else {
        showMessage("No se pudo conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!imageUrl) return;

    try {
      const response = await axios.get(imageUrl, {
        responseType: "blob", // importante
      });

      const blob = new Blob([response.data], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "imagen_generada.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error descargando la imagen:", error);
    }
  };
  //////////////////////////////////////////////////////
  const handleClick = () => {
    inputRef.current.click(); // simula clic en el input escondido
  };

  return (
    <div className="content-generate">
      <div className="content-text">
        <div className="info-box">
          <div className="input-button-wrapper">
            <label className="title-img-mask">Imagen de boceto</label>
            <input
              ref={inputRef}
              type="file"
              style={{ display: "none" }} //para ocultar el input
              onChange={(e) => {
                setFile(e.target.files[0]);
                setSelectedImage(null); // limpiamos la imagen predefinida
              }}
            />
            <div className="upload-file">
              <button type="button" onClick={handleClick}>
                Subir archivo
              </button>
              {/* Mostramos el nombreu si existe un archivo */}
              {file && <span>{file.name}</span>}
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Escribe tu prompt "
              className="prompt-input"
              rows={5} // ajusta la altura
            ></textarea>

            <button
              onClick={generateImageMask}
              className="generate-button"
              disabled={(!selectedImage && !prompt) || (!file && !prompt)}
            >
              Generar
            </button>
          </div>
        </div>
      </div>
      {/* ////////////////////////////////imagen generada */}
      <div className="image-generated-box">
        {imageUrl && (
          <>
            <img src={imageUrl} alt="Generada" className="generated-image" />
            <button onClick={downloadImage} className="download-button">
              Descargar
            </button>
            <button
              onClick={() => {
                setFile(null);
                setSelectedImage(null);
                setPreviewUrl(null);
                setImageUrl(null);
              }}
              className="reset-button"
            >
              Generar otra
            </button>
          </>
        )}
      </div>
      {/* ////////////////////////////////////preview de imagen subida o selecionada */}
      {(file || selectedImage) && !imageUrl && (
        <div className="preview-mask">
          <img
            src={file ? previewUrl : selectedImage.src}
            alt={file ? file.name : selectedImage.alt}
          />
        </div>
      )}
    </div>
  );
}
