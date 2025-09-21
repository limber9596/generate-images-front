import "../styles/ExampleImages.css";
export default function ExampleImages({
  image,
  selectedImage,
  handleSelect,
  handleDeselect,
}) {
  const isSelected = selectedImage?.src === image.src;

  return (
    <div className="image-container">
      <label>{image.alt}</label>
      <img
        src={image.src}
        alt={image.alt}
        onClick={() => handleSelect(image)}
        className={isSelected ? "selected" : ""}
      />

      {isSelected && (
        <div className="image-buttons">
          <button onClick={handleDeselect}>Desmarcar</button>
        </div>
      )}
    </div>
  );
}
