import React, { useState, useEffect, useRef } from "react";
import TextToImage from "../components/TextToImage";
import ImgToImgMask from "../components/ImgToImgMask";
import ExampleImages from "../components/ExampleImages";
import "../styles/Generator.css";

export default function Generator({
  selected,
  setSelected,
  setPromptText,
  setPromptMask,
  promptText,
  promptMask,
  imageUrl,
  setImageUrl,
}) {
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef();

  const images = [
    { src: "/cajonera.jpg", alt: "cajonera" },
    { src: "/closet.jpg", alt: "closet" },
    { src: "/escritorio.jpg", alt: "escritorio" },
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
    if (inputRef.current) inputRef.current.value = "";
  };
  const handleDeselect = () => setSelectedImage(null);

  return (
    <div>
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
            />
          ))}
        </div>
      )}

      <div>
        {selected === "text" && (
          <TextToImage prompt={promptText} setPrompt={setPromptText} />
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
          />
        )}
      </div>
    </div>
  );
}
