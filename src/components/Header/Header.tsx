import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../Utils/utils";
import "./Header.css";
import { logOutUser } from "../../service/userService";

export function Header() {
  const { loggedInUser } = useAuth();
  const [showButton, setShowButton] = useState(false);
  const { setLoggedInUser } = useAuth();
  function handleMouseEnter() {
    setShowButton(true);
  }
  function handleMouseLeave() {
    setShowButton(false);
  }
  function handleClick() {
    logOutUser();
    setLoggedInUser(null);
  }
  return (
    <>
      <div className="header">
        <div className="header_logo">
          <img className="header_logo_img" src="assets/twitter.svg" alt="" />
          <p className="header_logo_company">Another Twitter Clone</p>
        </div>
        <div
          className="header_user_wrapper"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="header_user_profile">
            <p className="header_user_profile_name">{loggedInUser?.name}</p>
            <div className="header_user_profile_pic">
              {getInitials(loggedInUser?.name || "")}
            </div>
          </div>
        </div>
      </div>

      <div
        className="header_options"
        style={{ display: showButton ? "block" : "none" }}
      >
        <div className="header_options_container">
          <button onClick={handleClick} className="header_options_button">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
