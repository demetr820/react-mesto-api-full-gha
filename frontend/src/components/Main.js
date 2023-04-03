import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const places = props.cards.map((place) => {
    return (
      <Card
        key={place._id}
        card={place}
        onCardClick={props.onCardClick}
        onCardLike={props.onCardLike}
        onCardDelete={props.onCardDelete}
      />
    );
  });
  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container" onClick={props.onEditAvatar}>
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        </div>
        <div className="profile__text">
          <h1 className="profile__user-name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button
            className="profile__button profile__button_edit"
            aria-label="редактировать"
            type="button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__button profile__button_add"
          aria-label="добавить место"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section
        className="places page__section page__section_places"
        aria-label="places"
      >
        {places}
      </section>
    </main>
  );
}

export default Main;
