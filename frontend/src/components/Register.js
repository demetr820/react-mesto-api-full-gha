import { useValidation } from "../hooks/useValidation";
import * as auth from "../utils/auth";
import { Link } from "react-router-dom";

export default function Register({ handleRegister }) {
  const { values, handleChange, errors, isValid, resetForm } = useValidation(
    {}
  );
  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values.email, values.password);
  }
  const loginLink = {
    marginTop: "15px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "17px",
    textAlign: "center",
    color: "#fff",
    textDecoration: "none",
  };
  return (
    <div className="user-actions">
      <h2 className="user-actions__title">Регистрация</h2>
      <form className="user-actions__form" onSubmit={handleSubmit}>
        <input
          className="user-actions__input"
          placeholder="Email"
          type="email"
          name="email"
          value={values.email || ""}
          required
          onChange={handleChange}
        />
        <span className="popup__error">{errors.email}</span>
        <input
          className="user-actions__input"
          placeholder="Пароль"
          type="password"
          name="password"
          value={values.password || ""}
          required
          onChange={handleChange}
        />
        <span className="popup__error">{errors.password}</span>
        <button className="user-actions__button">Зарегистрироваться</button>
        <Link style={loginLink} to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}
