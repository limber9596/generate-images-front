import Modal from "react-modal";

export default function MessageModal({ isOpen, mensaje, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Mensaje"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3001,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 3000, // overlay también por encima del otro modal
        },
      }}
    >
      <div className="modal-mensaje">
        <h2>{mensaje}</h2>
        <button
          className="btn btn-danger"
          style={{ padding: "6px" }}
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}
