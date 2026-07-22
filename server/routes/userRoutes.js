const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/resumeMiddleware");


const router = express.Router();
const { getProfile,
    updateProfile, 
    uploadResume, removeResume, analyzeResumeController } = require("../controllers/authController");



// Log the function to check if it's defined
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.post("/resume", verifyToken, upload.single("resume"), uploadResume);
router.delete("/resume", verifyToken, removeResume);
console.log("Registering /analyze-resume route");
// router.get("/test-resume",verifyToken,testResume);
router.get("/analyze-resume", verifyToken, analyzeResumeController);


module.exports = router;