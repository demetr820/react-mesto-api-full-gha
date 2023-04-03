export default function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  handleOverlayClick,
}) {
  return (
    <div
      className={`popup popup_type_${name}${isOpen ? " popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__container popup__container_form">
        <button
          className="popup__button-close"
          aria-label="close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form action="/" name={name} noValidate onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}
