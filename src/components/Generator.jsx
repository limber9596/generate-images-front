import React, { useState, useEffect, useRef } from "react";
import TextToImage from "../components/TextToImage";
import ImgToImgMask from "../components/ImgToImgMask";
import ExampleImages from "../components/ExampleImages";
import "../styles/Generator.css";

export default function Generator({
  selected,
  setPromptText,
  setPromptMask,
  promptText,
  promptMask,
  imageUrl,
  setImageUrl,
  setSelectedImage,
  selectedImage,
  file,
  setFile,
  downloadImage,
  previewUrl,
  setPreviewUrl,
  setIsModalOpen,
}) {
  const inputRef = useRef();

  const images = [
    { src: "/cajonera.jpeg", alt: "cajonera" },
    { src: "/closet.jpeg", alt: "closet" },
    { src: "/escritorio.jpeg", alt: "escritorio" },
  ];

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const handleSelect = (image) => {
    setSelectedImage(image);
    setFile(null);
    // setIsModalOpen(true);
    if (inputRef.current) inputRef.current.value = "";
  };
  const handleDeselect = () => setSelectedImage(null);

  return (
    <>
      {selected === "mask" && (
        <div className="images-example">
          {images.map((image) => (
            <ExampleImages
              key={image.src}
              image={image}
              selectedImage={selectedImage}
              file={file}
              handleSelect={handleSelect}
              handleDeselect={handleDeselect}
              imageUrl={imageUrl}
            />
          ))}
        </div>
      )}

      {selected === "text" && (
        <TextToImage
          prompt={promptText}
          setPrompt={setPromptText}
          downloadImage={downloadImage}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {selected === "mask" && (
        <ImgToImgMask
          prompt={promptMask}
          file={file}
          setPrompt={setPromptMask}
          setFile={setFile}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          inputRef={inputRef}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          downloadImage={downloadImage}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
