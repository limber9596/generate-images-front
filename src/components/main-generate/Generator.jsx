import React, { useState, useEffect, useRef } from "react";
import TextToImage from "../main-generate/TextToImage";
import ImgToImgMask from "../main-generate/ImgToImgMask";
import ExampleImages from "../ExampleImages";
import "../../styles/Generator.css";

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
  inputRef,
}) {
  return (
    <>
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
