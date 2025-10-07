import { useEffect } from "react";

export default function ImgToImgMask({
  prompt,
  setPrompt,
  file,
  setFile,
  setSelectedImage,
  selectedImage,
  inputRef,
  imageUrl,
  setImageUrl,
  setIsModalOpen,
  isModalOpen,
}) {
  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log("propmt seleccionado:", prompt);
    console.log("Imaggn seleccionada:", selectedImage);
    console.log("Archivo seleccionado:", file);
    console.log("URL de la imagen:", imageUrl);
  };
  //////////////////////////////////////////////////////
  const handleClick = () => {
    inputRef.current.click(); // simula clic en el input escondid
  };

  return (
    <div className="content-generate">
      <div className="content-data">
        <label className="title-img-mask">Imagen de boceto</label>
        <input
          ref={inputRef}
          type="file"
          style={{ display: "none" }} //para ocultar el input
          onChange={(e) => {
            setFile(e.target.files[0]);
            setSelectedImage(null); // limpiamos la imagen predefinida
          }}
        />
        <div className="upload-file">
          <button
            className="upload-button"
            type="button"
            onClick={handleClick}
            disabled={!!imageUrl}
          >
            {file ? "Archivo subido" : "Subir archivo"}
          </button>

          {file && (
            <span>
              {file.name}{" "}
              <button
                type="button"
                className="remove-file"
                onClick={() => setFile(null)}
              >
                ❌
              </button>
            </span>
          )}
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe tu prompt "
          className="prompt-input"
          rows={5} // ajusta la altura
          disabled={!!imageUrl}
        ></textarea>

        <button
          onClick={handleOpenModal}
          className={`generate-button ${
            (!selectedImage && !prompt) || (!file && !prompt) || imageUrl
              ? "generate-button-disabled"
              : ""
          }`}
          disabled={
            (!selectedImage && !prompt) || (!file && !prompt) || imageUrl
          }
        >
          Previsualizar
        </button>
      </div>
    </div>
  );
}
