export default function DeletePlacePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeletePlaceSubmit();
  }
  return (
    <div
      className={`popup popup_type_${props.name}${
        props.isOpen ? " popup_opened" : ""
      }`}
      onClick={props.handleOverlayClick}
    >
      <div className="popup__container confirmation">
        <button
          className="popup__button-close"
          aria-label="close"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="confirmation__title">Вы уверены?</h2>
        <button
          className="confirmation__button"
          type="button"
          onClick={handleSubmit}
        >
          {props.isLoading ? "Удаление..." : "Да"}
        </button>
      </div>
    </div>
  );
}
