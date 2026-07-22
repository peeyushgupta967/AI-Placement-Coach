const express = require("express");

const verifyToken = require("../middleware/authMiddleware");
const {addTaskController, getAllTasksController,
    updateTaskController, completeTaskController, 
    deleteTaskController, getTodayTasksController,
    getPendingTasksController
} = require("../controllers/plannerController");


const router = express.Router();
router.post(
    "/",
    verifyToken,
    addTaskController
);
router.get(
    "/",
    verifyToken,
    getAllTasksController
);
router.put(
    "/:id",
    verifyToken,
    updateTaskController
);
router.patch(
    "/:id/complete",
    verifyToken,
    completeTaskController
);
router.delete(
    "/:id",
    verifyToken,
    deleteTaskController
);
router.get(
    "/today",
    verifyToken,
    getTodayTasksController
);
router.get(
    "/pending",
    verifyToken,
    getPendingTasksController
);


module.exports = router;