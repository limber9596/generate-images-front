import React, { use, useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import Generator from "../components/Generator";
import ImagesModal from "../components/ImagesModal";
import { useImageGeneration } from "../hooks/useImageGeneration";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import UserInfo from "../components/UserInfo";
import UserMenu from "../components/UserMenu";
import "../styles/HomePage.css";
export default function HomePage() {
  const [selected, setSelected] = useState("text"); // modo activo
  const [promptText, setPromptText] = useState(""); // prompt compartido
  const [promptMask, setPromptMask] = useState(""); // prompt compartido
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { generateImageMask } = useImageGeneration();

  const { user, logout, token } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const userRole = user?.role;
  const timer = useRef(null);
  useEffect(() => {
    console.log("userRole:", userRole);
  });
  //////////////////////////////////////77
  useEffect(() => {
    if (!token) return;

    const updateActivity = () => {
      axios.post(`${apiUrl}/ping`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    };

    // Eventos de actividad reales
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((e) => window.addEventListener(e, updateActivity));

    return () => {
      events.forEach((e) => window.removeEventListener(e, updateActivity));
    };
  }, [token]);

  /////////////////////////////////////////////
  useEffect(() => {
    if (!token) return;

    const resetTimer = () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        logout();
        alert("Sesión cerrada por inactividad");
      }, 180000); // 3 minuto
    };

    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    resetTimer(); // iniciar timer

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timer.current);
    };
  }, [token, logout]);

  //////////////////////////////////////////////////////
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="content-home">
      <div className="home">
        <h1 className="title">LM Render</h1>
        <div className="user-container">
          <div className="user-menu">
            <UserMenu />
          </div>
          {userRole === "dev" && (
            <div className="user-info">
              <UserInfo userRole={userRole} token={token} />
            </div>
          )}
        </div>

        {/* barra de navegacion elegir solo texto o boceto */}
        <NavBar
          selected={selected}
          setSelected={setSelected}
          setPromptText={setPromptText}
          setPromptMask={setPromptMask}
          promptText={promptText}
          promptMask={promptMask}
          imageUrl={imageUrl}
          selectedImage={selectedImage}
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
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <ImagesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        file={file}
        selectedImage={selectedImage}
        previewUrl={previewUrl}
        imageUrl={imageUrl}
        downloadImage={downloadImage}
        setFile={setFile}
        setSelectedImage={setSelectedImage}
        setPreviewUrl={setPreviewUrl}
        setImageUrl={setImageUrl}
        setPromptMask={setPromptMask}
        promptMask={promptMask}
        promptText={promptText}
        setPromptText={setPromptText}
        generateImageMask={generateImageMask}
      />
    </div>
  );
}
