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

  //////////////////////////////////////////////////////
  const handleClick = () => {
    inputRef.current.click(); // simula clic en el input escondido
  };
  return (
    <div className="content-generate">
      <div className="content-data">
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
          <button type="button" onClick={handleClick} disabled={!!imageUrl}>
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
          disabled={!!imageUrl}
        ></textarea>

        <button
          onClick={generateImageMask}
          className={`generate-button ${
            (!selectedImage && !prompt) || (!file && !prompt) || imageUrl
              ? "generate-button-disabled"
              : ""
          }`}
          disabled={
            (!selectedImage && !prompt) || (!file && !prompt) || imageUrl
          }
        >
          Generar
        </button>
      </div>
    </div>
  );
}
