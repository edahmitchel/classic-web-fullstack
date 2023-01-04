const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  updateUser,
  verifyEmail,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
  .post(registerUser)
  .get(protect, allUsers)
  .patch(protect, updateUser);

router.get("/verify-email", verifyEmail);
router.post("/login", authUser);
router.put("/update", authUser);
// router.route("/");
module.exports = router;
