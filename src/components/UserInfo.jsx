import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserInfo.css";
import { DateTime } from "luxon";
export default function UserInfo({ userRole, token }) {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const tz = import.meta.env.VITE_APP_TIMEZONE || "America/Guayaquil";
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
    try {
      const res = await axios.get(`${apiUrl}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      console.log("Usuarios obtenidos:", res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleReset = async (userId) => {
    await axios.post(
      `${apiUrl}/reset-image-count`,
      { userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, image_count: 0 } : u))
    );
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
                        <td>{firstTwoWords}</td>
                        <td>{u.email}</td>
                        <td>{u.image_count}</td>
                        <td>{formatLastActivity(u.last_activity)}</td>
                        <td>{u.status}</td>
                        <td>
                          <button onClick={() => handleReset(u.id)}>
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
    </>
  );
}
