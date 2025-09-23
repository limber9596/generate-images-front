import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Generator from "../components/Generator";
import Images from "../components/Images";
import axios from "axios";
import "../styles/HomePage.css";
export default function HomePage() {
  const [selected, setSelected] = useState("text"); // modo activo
  const [promptText, setPromptText] = useState(""); // prompt compartido
  const [promptMask, setPromptMask] = useState(""); // prompt compartido
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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

  return (
    <div className="content-home">
      <div className="home">
        <h1 className="title">LM Render</h1>

        {/* barra de navegacion elegir solo texto o boceto */}
        <NavBar
          selected={selected}
          setSelected={setSelected}
          setPromptText={setPromptText}
          setPromptMask={setPromptMask}
          promptText={promptText}
          promptMask={promptMask}
          imageUrl={imageUrl}
        />
        <Generator
          selected={selected}
          setSelected={setSelected}
          setPromptText={setPromptText}
          setPromptMask={setPromptMask}
          promptText={promptText}
          promptMask={promptMask}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          file={file}
          setFile={setFile}
          downloadImage={downloadImage}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
        />
      </div>
      <Images
        file={file}
        selectedImage={selectedImage}
        previewUrl={previewUrl}
        imageUrl={imageUrl}
        downloadImage={downloadImage}
        setFile={setFile}
        setSelectedImage={setSelectedImage}
        setPreviewUrl={setPreviewUrl}
        setImageUrl={setImageUrl}
        setPrompt={setPromptMask}
      />
    </div>
  );
}
