const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const salt = 10;
const User = require("../models/user");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ConflictError = require("../errors/ConflictError");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};
const getUserByID = async (id, res, next) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("Пользователь не найден"));
        return;
      }
      res.send(user);
    })
    .catch(next);
};

const getMeWrapper = (fn) => (req, res, next) => {
  const id = req.user._id;
  return fn(id, res, next);
};
const getUserWrapper = (fn) => (req, res, next) => {
  const { userID } = req.params;
  console.log(userID, req.params);
  return fn(userID, res, next);
};
const getMe = getMeWrapper(getUserByID);
const getUser = getUserWrapper(getUserByID);
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, salt)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Почта уже занята"));
        return;
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Не корректные данные"));
        return;
      }
      next(err);
    });
};
const updateProfile = (data, req, res, next) => {
  User.findByIdAndUpdate(req.user._id, data, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError("Пользователь не найден"));
        return;
      }
      res.send(user);
    })
    .catch(next);
};
const updateUserWrapper = (fn) => (req, res, next) => {
  const { name, about } = req.body;
  return fn({ name: name, about: about }, req, res, next);
};

const updateAvatarWrapper = (fn) => (req, res, next) => {
  const { avatar } = req.body;
  return fn({ avatar }, req, res, next);
};
const updateUser = updateUserWrapper(updateProfile);
const updateAvatar = updateAvatarWrapper(updateProfile);
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .orFail(new UnauthorizedError("Не верная почта или пароль"))
    .then((user) =>
      bcrypt.compare(password, user.password).then((matched) => {
        if (matched) {
          return user;
        }
        return Promise.reject(
          new UnauthorizedError("Не верная почта или пароль")
        );
      })
    )
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(next);
};
module.exports = {
  getUsers,
  getUser,
  getMe,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
