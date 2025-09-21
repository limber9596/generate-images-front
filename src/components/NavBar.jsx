import "../styles/NavBar.css";
import React, { useEffect } from "react";
export default function NavBar({
  selected,
  setSelected,
  setPromptText,
  setPromptMask,
  promptText,
  promptMask,
  imageUrl,
}) {
  // Ejemplos separados por componente
  const textPrompts = [
    "Diseña una sala moderna minimalista con sofás grises",
    "Un dormitorio elegante con paredes blancas y muebles de madera oscura",
    "Un comedor escandinavo con sillas de diseño y lámpara colgante",
  ];

  const maskPrompts = [
    "Convierte este boceto en una cajonera de madera caoba con acabado color nogal realista",
    "Convierte este boceto en un closet de madera roble con acabado color miel realista",
    "Convierte este boceto en un escritorio de madera pino con acabado color cerezo realista",
  ];

  const examplePrompts = selected === "text" ? textPrompts : maskPrompts;

  return (
    <nav className="nav">
      <button
        onClick={() => setSelected("text")}
        className={`nav-button${selected === "text" ? " active" : ""}`}
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

      <div className="examples-dropdown">
        <select
          className="dropdown-select"
          value={selected === "text" ? promptText : promptMask} // <--- control
          onChange={(e) => {
            if (selected === "text") setPromptText(e.target.value);
            else setPromptMask(e.target.value);
          }}
        >
          <option value="">Ejemplos de prompt</option>
          {examplePrompts.map((prompt) => (
            <option value={prompt}>{prompt}</option>
          ))}
        </select>
      </div>
    </nav>
  );
}
