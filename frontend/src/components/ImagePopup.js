function ImagePopup(props) {
  const { name, link } = props.card;
  return (
    <div
      className={`popup popup_type_image${
        props.card.hasOwnProperty("name") ? " popup_opened" : ""
      }`}
    >
      <figure className="popup__container popup__container_image">
        <button
          className="popup__button-close"
          aria-label="close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img className="popup-image__picture" src={link} alt={name} />
        <h2 className="popup-image__title">{name}</h2>
      </figure>
    </div>
  );
}

export default ImagePopup;
