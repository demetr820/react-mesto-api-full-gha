const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { validateURL } = require("../utils/consts");
const userRoutes = require("./users");
const cardsRoutes = require("./cards");
const { login, createUser } = require("../controllers/users");
const NotFoundError = require("../errors/NotFoundError");
const auth = require("../middlewares/auth");

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});
router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

router.use(auth);

router.use("/users", userRoutes);

router.use("/cards", cardsRoutes);

router.use("*", (req, res, next) =>
  next(new NotFoundError("Страница не найдена"))
);

module.exports = router;
