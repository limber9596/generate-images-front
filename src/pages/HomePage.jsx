import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Generator from "../components/Generator";
import "../styles/HomePage.css";

export default function HomePage() {
  const [selected, setSelected] = useState("text"); // modo activo
  const [promptText, setPromptText] = useState(""); // prompt compartido
  const [promptMask, setPromptMask] = useState(""); // prompt compartido
  const [imageUrl, setImageUrl] = useState(null);
  return (
    <div className="content-home">
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
      />
    </div>
  );
}
