const { addTask, getAllTasks, updateTask,
    completeTask, deleteTask, 
    getTodayTasks, getPendingTasks
} = require("../models/plannerModel");


const addTaskController = (req, res) => {

    const {
        title,
        description,
        priority,
        status,
        due_date
    } = req.body;

    if (!title || !priority || !due_date) {
        return res.status(400).json({
            message: "All required fields are required"
        });
    }

    addTask(
        req.user.id,
        title,
        description,
        priority,
        due_date,
        (err, result) => {
            if (err) {

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            return res.status(201).json({
                message: "Task Added Successfully",
                taskId: result.insertId
            });
        }
    );
};


const getAllTasksController = (req, res) => {

    getAllTasks(req.user.id, (err, result) => {
        if (err) {

            return res.status(500).json({
                message: "Database Error"
            });
        }

        return res.status(200).json({
            success: true,
            count: result.length,
            tasks: result
        });
    });
};


const updateTaskController = (req, res) => {

    const { id } = req.params;
    const {
        title,
        description,
        priority,
        due_date
    } = req.body;

    if (!title || !priority || !due_date) {
        return res.status(400).json({
            message: "All required fields are required"
        });
    }

    updateTask(
        id,
        req.user.id,
        title,
        description,
        priority,
        due_date,

        (err, result) => {
            if (err) {

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Task Not Found"
                });
            }

            return res.status(200).json({
                message: "Task Updated Successfully"
            });
        }
    );
};

const completeTaskController = (req, res) => {

    const { id } = req.params;

    completeTask(id, req.user.id, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Database Error"
            });

        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Task Not Found"
            });

        }

        return res.status(200).json({

            message: "Task Completed Successfully"

        });

    });

};

const deleteTaskController = (req, res) => {

    const { id } = req.params;

    deleteTask(id, req.user.id, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Database Error"
            });

        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Task Not Found"
            });

        }

        return res.status(200).json({
            message: "Task Deleted Successfully"
        });

    });

};


const getTodayTasksController = (req, res) => {

    getTodayTasks(req.user.id, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Database Error"
            });

        }

        return res.json({

            success: true,

            count: result.length,

            tasks: result

        });

    });

};

const getPendingTasksController = (req, res) => {

    getPendingTasks(req.user.id, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Database Error"
            });

        }

        return res.json({

            success: true,

            count: result.length,

            tasks: result

        });

    });

};

module.exports = {
    addTaskController, getAllTasksController, 
    updateTaskController, completeTaskController,
    deleteTaskController, getTodayTasksController, getPendingTasksController

};