const express = require("express");
const {
  accessChat,
  fetchChats,
  createIntrestChat,
  renameIntrestChat,
  joinIntrestChat,
  removeIntrestChat,
  fetchAllIntrestChat,
} = require("../controllers/chatControllers");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, accessChat).get(protect, fetchChats);
router
  .route("/intrest")
  .post(protect, createIntrestChat)
  .get(protect, fetchAllIntrestChat);
// .put;
router.route("/intrest/rename").put(protect, renameIntrestChat);
router.route("/intrest/delete").put(protect, removeIntrestChat);
router.route("/intrest/join").put(protect, joinIntrestChat);

// router.route("/");
module.exports = router;
