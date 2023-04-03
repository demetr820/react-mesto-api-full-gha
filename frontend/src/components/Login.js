import { useValidation } from "../hooks/useValidation";

export default function Login(props) {
  const { values, handleChange, errors, isValid, resetForm } = useValidation(
    {}
  );
  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(values.email, values.password);
  }
  return (
    <div className="user-actions">
      <h2 className="user-actions__title">Вход</h2>
      <form className="user-actions__form" onSubmit={handleSubmit}>
        <input
          className="user-actions__input"
          placeholder="Email"
          name="email"
          type="email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className="popup__error">{errors.name}</span>
        <input
          className="user-actions__input"
          placeholder="Пароль"
          name="password"
          type="password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        <span className="popup__error">{errors.password}</span>
        <button className="user-actions__button">Войти</button>
      </form>
    </div>
  );
}
