import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/UserInfo.css";
import { DateTime } from "luxon";
import ConfirmDialogModal from "../modals/ConfirmDialogModal";
import { useLoading } from "../../context/LoadingContext";
export default function UserInfo({ userRole, token }) {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const tz = import.meta.env.VITE_APP_TIMEZONE || "America/Guayaquil";
  const { setLoading } = useLoading();
  useEffect(() => {
    if (userRole !== "dev") return;

    if (isModalOpen) {
      fetchUsers();
      console.log("Usuarios obtenidos:", users);
    }
  }, [userRole, isModalOpen]);

  const formatLastActivity = (lastActivity) => {
    if (!lastActivity) return "—";

    return DateTime.fromISO(lastActivity) // <-- usar fromSQL para timestamp sin zona
      .setZone(tz) // <-- convertir a la zona deseada
      .toFormat("dd/MM/yyyy, hh:mm:ss a");
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      console.log("Usuarios obtenidos:", res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetConfirm = async (userId) => {
    setOpenDialog(true);
    setUserId(userId);
  };
  const resetImageCount = async (userId) => {
    setLoading(true);
    try {
      await axios.post(
        `${apiUrl}/reset-image-count`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchUsers();
      setOpenDialog(false);
    } catch (error) {
      console.error("Error al resetear el contador de imágenes:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setLoading(false);
    }
  };

  if (userRole !== "dev") return null;

  return (
    <>
      {/* Botón para abrir modal */}
      <button onClick={() => setIsModalOpen(true)}>Users</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              X
            </button>

            <div className="table-container">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Imagenes</th>
                    <th>Última vez conectado</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    const firstTwoWords = u.name
                      .split(" ")
                      .slice(0, 2)
                      .join(" ");
                    return (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{firstTwoWords}</td>
                        <td>{u.email}</td>
                        <td>{u.image_count}</td>
                        <td>{formatLastActivity(u.last_activity)}</td>
                        <td>{u.status}</td>
                        <td>
                          <button onClick={() => handleResetConfirm(u.id)}>
                            Reset
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialogModal
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={() => resetImageCount(userId)}
        userId={userId}
      />
    </>
  );
}
