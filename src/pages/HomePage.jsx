import { use, useEffect, useRef } from "react";

import { useMessage } from "../context/MessageContext";
import { useAuth } from "../context/AuthContext";
import { useImageGenerator } from "../context/ImageGenContext";
import { useUserActivity } from "../hooks/UserActivity";

import TabsNav from "../components/header/TabsNav";
import Generator from "../components/main-generate/Generator";
import ImagesModal from "../components/modals/ImagesModal";
import Header from "../components/header/Header";
import ExampleImages from "../components/ExampleImages";

import "../styles/HomePage.css";

export default function HomePage() {
  ///////////////////////////////////
  const apiUrl = import.meta.env.VITE_API_URL;

  const { showMessage } = useMessage();
  const { user, logout, token } = useAuth();
  const { file, setPreviewUrl, selected, imageUrl } = useImageGenerator();

  const userRole = user?.role;

  const images = [
    { src: "/cajonera.jpg", alt: "cajonera" },
    { src: "/closet.jpg", alt: "closet" },
    { src: "/escritorio.jpg", alt: "escritorio" },
  ];
  useEffect(() => {
    if (imageUrl) {
      console.log("Imagen generada desde home:", imageUrl);
    }
  }, [imageUrl]);
  //////efecto secundario para ver el preview de la imagen seleccionada o subida
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  useUserActivity({ token, logout, showMessage, apiUrl });
  return (
    <div className="content-home">
      <div className="home">
        <Header userRole={userRole} token={token} />
        {/* barra de navegacion elegir solo texto o boceto */}
        <TabsNav />
        {selected === "mask" && (
          <div className="images-example">
            {images.map((image) => (
              <ExampleImages key={image.src} image={image} />
            ))}
          </div>
        )}
        <Generator />
      </div>
      <ImagesModal />
    </div>
  );
}
