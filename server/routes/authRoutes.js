const express = require("express");
const { registerUser , loginUser, verifyEmailController} = require("../controllers/authController");

const router = express.Router();
router.post("/login", loginUser);

router.post("/register", registerUser);
router.get(
    "/verify-email/:token",
    verifyEmailController
);


module.exports = router;