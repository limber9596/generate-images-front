import React from "react";
import "../../styles/ConfirmDialogModal.css"; // importa los estilos

const ConfirmDialogModal = ({ isOpen, onClose, onConfirm, userId }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <h2 className="confirm-title">Confirmación</h2>
        <p className="confirm-message">Seguro de resetear user {userId}</p>
        <div className="confirm-actions">
          <button onClick={onClose} className="btn-cancel">
            Cancelar
          </button>
          <button onClick={onConfirm} className="btn-confirm">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialogModal;
