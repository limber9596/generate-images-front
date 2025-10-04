import "../../styles/NavBar.css";
import React, { use, useEffect } from "react";
import Dropdown from "./DropDown";
export default function TabsNav({
  selected,
  setSelected,
  setPromptText,
  setPromptMask,
  promptText,
  promptMask,
  imageUrl,
  selectedImage,
}) {
  // Ejemplos separados por componente
  const textPrompts = [
    "Diseña una sala moderna minimalista con sofás grises",
    "Un dormitorio elegante con paredes blancas y muebles de madera oscura",
    "Un comedor escandinavo con sillas de diseño y lámpara colgante",
  ];

  const maskPrompts = [
    "Convierte este boceto en una cajonera de madera estilo fotorealista",
    "Convierte este boceto en un closet de madera fotorealista",
    "Convierte este boceto en un escritorio de madera fotorealista",
  ];
  useEffect(() => {
    if (selectedImage?.alt && selected === "mask") {
      const imageName = selectedImage.alt.toLowerCase(); // ejemplo: "closet"

      // Busca un prompt que contenga el nombre de la imagen
      const matchedPrompt = maskPrompts.find((prompt) =>
        prompt.toLowerCase().includes(imageName)
      );

      if (matchedPrompt) {
        setPromptMask(matchedPrompt);
      }
    }
  }, [selectedImage, selected]);
  // ////////////////////////////////////////////////
  useEffect(() => {
    if (!selectedImage && selected === "mask") {
      setPromptMask("");
    }
  }, [selectedImage, selected]);

  const examplePrompts = selected === "text" ? textPrompts : maskPrompts;

  return (
    <nav className="nav">
      <button
        onClick={() => setSelected("text")}
        className={`nav-button${selected === "text" ? " active" : ""} `}
        disabled={!!imageUrl}
      >
        Texto
      </button>
      <button
        onClick={() => setSelected("mask")}
        className={`nav-button${selected === "mask" ? " active" : ""}`}
        disabled={!!imageUrl}
      >
        Boceto
      </button>
      {selected !== "mask" && (
        <Dropdown
          examplePrompts={examplePrompts}
          selected={selected}
          setPromptText={setPromptText}
          setPromptMask={setPromptMask}
          imageUrl={imageUrl}
          promptText={promptText}
          promptMask={promptMask}
        />
      )}
    </nav>
  );
}
