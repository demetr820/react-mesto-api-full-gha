import successStatus from "../images/icon-success.svg";
import errorStatus from "../images/icon-error.svg";

export default function infoTooltip({
  isOpen,
  isSuccess,
  onClose,
  successMessage,
  errorMessage,
  handleOverlayClick,
}) {
  return (
    <div
      className={`popup ${isOpen ? " popup_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__container tooltip">
        <button
          className="popup__button-close"
          aria-label="close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="tooltip__image"
          src={isSuccess ? successStatus : errorStatus}
          alt={`${isSuccess ? "icon success" : "icon error"}`}
        />
        <p className="tooltip__text">
          {isSuccess ? successMessage : errorMessage}
        </p>
      </div>
    </div>
  );
}
