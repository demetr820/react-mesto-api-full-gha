const router = require("express").Router();
const { validateSignin, validateSignup } = require("../utils/validation");

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
router.post("/signup", validateSignup, createUser);

router.post("/signin", validateSignin, login);

router.use(auth);

router.use("/users", userRoutes);

router.use("/cards", cardsRoutes);

router.use("*", (req, res, next) =>
  next(new NotFoundError("Страница не найдена"))
);

module.exports = router;
