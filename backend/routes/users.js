const router = require("express").Router();
const {
  validateProfile,
  validateAvatar,
  validateParams,
} = require("../utils/validation");

const {
  getUsers,
  getUser,
  getMe,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/", getUsers);

router.get("/me", getMe);

router.get("/:userID", validateParams, getUser);

router.patch("/me", validateProfile, updateUser);

router.patch("/me/avatar", validateAvatar, updateAvatar);

module.exports = router;
