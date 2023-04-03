import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card(props) {
  const { name, link, likes, owner } = props.card;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = owner === currentUser._id;
  const isLiked = likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `places__like-button ${
    isLiked ? "places__like-button_active" : ""
  }`;
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleDeleteCard() {
    props.onCardDelete(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  return (
    <article className="places__item">
      {isOwn && (
        <button
          className="places__button-delete"
          type="button"
          aria-label="delete"
          onClick={handleDeleteCard}
        />
      )}
      <img
        className="places__image"
        src={link}
        onClick={handleClick}
        alt={name}
      />
      <div className="places__body">
        <h2 className="places__title">{name}</h2>
        <div className="places__like-block">
          <button
            className={cardLikeButtonClassName}
            aria-label="like"
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="places__like-counter">{likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
