// components/Header.jsx
import React from "react";
import UserMenu from "../header/UserMenu";
import UserInfo from "../header/UserInfo";

const Header = ({ userRole, token }) => {
  return (
    <header>
      <h1 className="title">LM Render</h1>
      <div className="user-container">
        <div className="user-menu">
          <UserMenu />
        </div>
        {userRole === "dev" && (
          <div className="user-info">
            <UserInfo userRole={userRole} token={token} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
