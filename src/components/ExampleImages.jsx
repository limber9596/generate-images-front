import { useEffect } from "react";
import "../styles/ExampleImages.css";
export default function ExampleImages({
  image,
  selectedImage,
  handleSelect,
  handleDeselect,
  imageUrl,
}) {
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
