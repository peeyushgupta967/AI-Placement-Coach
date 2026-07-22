const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const {getDashboardController
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
    "/",
    verifyToken,
    getDashboardController
);

module.exports = router;