import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const styles = {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "transparent",
    cursor: "pointer",
  };
  return (
    <header
      className={`header ${
        isOpen ? "header_mobile" : ""
      } page__section page__section_header `}
    >
      <a className="header__logo" href="#" aria-label="logo"></a>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className={`user-block ${isOpen ? "user-block_visible" : ""}`}
              >
                <span className="user-block__email">
                  {props.userData.email}
                </span>
                <button
                  className="user-block__logout"
                  style={styles}
                  onClick={props.handleLogOut}
                >
                  Выйти
                </button>
              </div>
              <button
                type="button"
                className={`burger ${isOpen ? "burger_close" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="burger__line"></div>
              </button>
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link style={styles} to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link style={styles} to="/sign-in">
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
