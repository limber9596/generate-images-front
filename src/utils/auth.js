import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const logoutBackend = async (token) => {
  try {
    await axios.post(
      `${apiUrl}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error al cerrar sesión en backend:", error);
  }
};
