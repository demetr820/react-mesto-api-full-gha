const router = require("express").Router();
const { validateCard, validateParams } = require("../utils/validation");

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards);

router.post("/", validateCard, createCard);

router.delete("/:cardId", validateParams, deleteCard);

router.put("/:cardId/likes", validateParams, likeCard);

router.delete("/:cardId/likes", validateParams, dislikeCard);

module.exports = router;
