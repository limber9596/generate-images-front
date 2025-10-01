import { use, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/UserMenu.css";
import defaultAvatar from "../../public/user.png";
export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log("foto del ussuario es: ", user?.picture);
  });
  return (
    <div className="user-menu">
      {/* Avatar */}
      <div className="avatar" onClick={() => setOpen(!open)}>
        <img
          src={user?.picture || defaultAvatar}
          alt={"sin-foto"}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="dropdown">
          <div className="dropdown-content">
            <img
              className="dropdown-img"
              src={user?.picture || "/user.png"}
              alt="sin-foto"
            />
            <span className="dropdown-name">
              {user?.name ? user.name.split(" ").slice(0, 2).join(" ") : ""}
            </span>
          </div>

          <button onClick={logout} className="dropdown-logout">
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
