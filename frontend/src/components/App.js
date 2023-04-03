import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessStatus, setIsSuccessStatus] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedForDeletionCard, setSelectedForDeletionCard] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, data]) => {
          const cards = data.data;
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(err))
        .finally((_) => {});
    }
  }, [loggedIn]);
  useEffect(() => {
    handleTokenCheck();
  }, []);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleCardClick(card) {
    setSelectedCard({ ...card });
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    console.log(card);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
      ).catch((err) => console.log(err));
    });
  }
  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(selectedForDeletionCard._id)
      .then(() => {
        setCards((state) => {
          return state.filter((c) => c._id !== selectedForDeletionCard._id);
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }
  function selectedForDeletion(card) {
    setIsDeletePlacePopupOpen(true);
    setSelectedForDeletionCard({ ...card });
  }
  function handleUpdateUser(user) {
    setIsLoading(true);
    api
      .setUserInfo(user)
      .then((i) => {
        setCurrentUser(i);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .setUserAvatar(avatar)
      .then((i) => {
        setCurrentUser(i);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  function handleAddPlaceSubmit(item) {
    setIsLoading(true);
    api
      .createCard(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedForDeletionCard({});
    setSelectedCard({});
  }
  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserData({
              _id: res._id,
              email: res.email,
            });
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setUserData({
          ...userData,
          email: email,
        });
        setLoggedIn(true);
        navigate("/");
        return res;
      })
      .catch((err) => {
        setIsSuccessStatus(false);
        handleTooltipOpen();
        console.log(err);
      });
  }
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setUserData({
          _id: res.data,
          email: res.data,
        });
        setIsSuccessStatus(true);
        handleTooltipOpen();
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsSuccessStatus(false);
        handleTooltipOpen();
        console.log(err);
      });
  }
  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  }
  function handleTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }
  const mainProps = {
    onEditProfile: handleEditProfileClick,
    onAddPlace: handleAddPlaceClick,
    onEditAvatar: handleEditAvatarClick,
    onCardClick: handleCardClick,
    onCardLike: handleCardLike,
    onCardDelete: selectedForDeletion,
    cards: cards,
    openDeletePopup: setIsDeletePlacePopupOpen,
  };
  const serverMessages = {
    success: "Вы успешно зарегистрировались!",
    error: "Что-то пошло не так! Попробуйте ещё раз.",
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          handleLogOut={handleLogOut}
          userData={userData}
          loggedIn={loggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main {...mainProps} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          handleOverlayClick={handleOverlayClick}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          handleOverlayClick={handleOverlayClick}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isLoading={isLoading}
          handleOverlayClick={handleOverlayClick}
        />
        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          onDeletePlaceSubmit={handleCardDelete}
          isLoading={isLoading}
          handleOverlayClick={handleOverlayClick}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          handleOverlayClick={handleOverlayClick}
        />
        <InfoTooltip
          isSuccess={isSuccessStatus}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          successMessage={serverMessages.success}
          errorMessage={serverMessages.error}
          handleOverlayClick={handleOverlayClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
