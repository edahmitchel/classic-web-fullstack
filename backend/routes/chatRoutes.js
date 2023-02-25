const express = require("express");
const {
  accessChat,
  fetchChats,
  createInterestChat,
  renameInterestChat,
  joinInterestChat,
  removeInterestChat,
  fetchAllInterestChat,
} = require("../controllers/chatControllers");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, accessChat).get(protect, fetchChats);
router
  .route("/intrest")
  .post(protect, createInterestChat)
  .get(protect, fetchAllInterestChat);
// .put;
router.route("/intrest/rename").put(protect, renameInterestChat);
router.route("/intrest/delete").put(protect, removeInterestChat);
router.route("/intrest/join").put(protect, joinInterestChat);

// router.route("/");
module.exports = router;
