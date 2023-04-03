import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useValidation } from "../hooks/useValidation";

export default function EditAvatarPopup(props) {
  const { values, handleChange, errors, isValid, resetForm } = useValidation(
    {}
  );
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    resetForm({ avatar: "" });
  }
  const avatarRef = useRef();
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={props.isOpen}
      onClose={() => {
        props.onClose();
        resetForm({ avatar: "" });
      }}
      onSubmit={handleSubmit}
      handleOverlayClick={props.handleOverlayClick}
    >
      <input
        className="popup__input popup__input_type_user-name"
        type="url"
        name="avatar"
        aria-label="user-avatar"
        value={values.avatar || ""}
        onChange={handleChange}
        ref={avatarRef}
        required
      />
      <span className="popup__error">{errors.avatar}</span>
      <button
        className={`popup__button-submit ${
          isValid ? "" : " popup__button-submit_disabled"
        }`}
        type="submit"
      >
        {props.isLoading ? "Сохраняю..." : "Сохранить"}
      </button>
    </PopupWithForm>
  );
}
