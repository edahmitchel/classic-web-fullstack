const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  updateUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
  .post(registerUser)
  .get(protect, allUsers)
  .patch(protect, updateUser);
router.post("/login", authUser);
router.put("/update", authUser);
// router.route("/");
module.exports = router;
