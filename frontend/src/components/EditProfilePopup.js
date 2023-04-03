import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useValidation } from "../hooks/useValidation";

export default function EditProfilePopup(props) {
  const { values, setValues, handleChange, errors, isValid, resetForm } =
    useValidation({});
  const currentUser = useContext(CurrentUserContext);
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(values);
  }
  useEffect(() => {
    const { name, about } = currentUser;
    setValues({ name, about });
  }, [currentUser]);
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={props.isOpen}
      onClose={() => {
        props.onClose();
        resetForm(currentUser);
      }}
      onSubmit={handleSubmit}
      handleOverlayClick={props.handleOverlayClick}
    >
      <input
        className="popup__input popup__input_type_user-name"
        type="text"
        name="name"
        aria-label="user-name"
        minLength="2"
        maxLength="40"
        required
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="popup__error">{errors.name}</span>
      <input
        className="popup__input popup__input_type_description"
        type="text"
        name="about"
        aria-label="user-description"
        minLength="2"
        maxLength="200"
        required
        value={values.about || ""}
        onChange={handleChange}
      />
      <span className="popup__error">{errors.about}</span>
      <button
        className={`popup__button-submit ${
          isValid ? "" : " popup__button-submit_disabled"
        }`}
        disabled={isValid ? false : true}
        type="submit"
      >
        {props.isLoading ? "Сохраняю..." : "Сохранить"}
      </button>
    </PopupWithForm>
  );
}
