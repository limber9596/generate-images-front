import { useEffect } from "react";
import { useImageGenerator } from "../context/ImageGenContext";

import "../styles/ExampleImages.css";
export default function ExampleImages({ image }) {
  const { selectedImage, handleSelect, handleDeselect, imageUrl } =
    useImageGenerator();

  const isSelected = selectedImage?.src === image.src;
  const isDisabled = !!imageUrl;

  return (
    <div className="image-container">
      <label>{image.alt}</label>
      <img
        src={image.src}
        alt={image.alt}
        onClick={() => !isDisabled && handleSelect(image)}
        className={`${isSelected ? "selected" : ""} ${
          isDisabled ? "disabled" : ""
        }`}
      />

      {isSelected && (
        <div className="image-buttons">
          <button onClick={handleDeselect} disabled={!!imageUrl}>
            ✖
          </button>
        </div>
      )}
    </div>
  );
}
