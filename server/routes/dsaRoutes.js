const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const {
    addProblemController,
    getAllProblemsController,
    updateProblemController,
    deleteProblemController,
    getDifficultyStatsController,
    getTopicStatsController,
    getStreakController,getDashboardController
} = require("../controllers/dsaController");

const router = express.Router();
router.get(
    "/",
    verifyToken,
    getAllProblemsController
);
router.post(
    "/",
    verifyToken,
    addProblemController
);
router.put(
    "/:id",
    verifyToken,
    updateProblemController
);
router.delete(
    "/:id",
    verifyToken,
    deleteProblemController
);
router.get(
    "/stats/difficulty",
    verifyToken,
    getDifficultyStatsController
);
router.get(
    "/streak",
    verifyToken,
    getStreakController
);
router.get(
    "/dashboard",
    verifyToken,
    getDashboardController
);
router.get("/stats/topic", verifyToken, getTopicStatsController)
module.exports = router;