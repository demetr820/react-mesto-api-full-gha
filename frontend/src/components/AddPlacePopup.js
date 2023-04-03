import PopupWithForm from "./PopupWithForm";
import { useValidation } from "../hooks/useValidation";

export default function AddPlacePopup(props) {
  const { values, handleChange, errors, isValid, resetForm } = useValidation(
    {}
  );
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit(values);
    resetForm({ name: "", link: "" });
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="new-card"
      isOpen={props.isOpen}
      onClose={() => {
        props.onClose();
        resetForm({ name: "", link: "" });
      }}
      onSubmit={handleSubmit}
      handleOverlayClick={props.handleOverlayClick}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        aria-label="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="popup__error">{errors.name}</span>
      <input
        className="popup__input popup__input_type_link"
        type="url"
        name="link"
        aria-label="link"
        placeholder="Ссылка на картинку"
        required
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className="popup__error">{errors.link}</span>
      <button
        className={`popup__button-submit ${
          isValid ? "" : " popup__button-submit_disabled"
        }`}
        disabled={isValid ? false : true}
        type="submit"
      >
        {props.isLoading ? "Сохраняю..." : "Создать"}
      </button>
    </PopupWithForm>
  );
}
