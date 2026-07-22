const { addProblem, getAllProblems, updateProblem, 
    deleteProblem, getDifficultyStats,
getTopicStats, getSolvedDates, 
getTotalProblems} = require("../models/dsaModel");

const addProblemController = (req, res) => {

    const {
        problem_name,
        platform,
        difficulty,
        topic,
        problem_link,
        solved_date,
        notes
    } = req.body;

    if (
        !problem_name ||
        !platform ||
        !difficulty ||
        !topic ||
        !solved_date
    ) {

        return res.status(400).json({
            message: "All required fields are required"
        });

    }

    addProblem(

        req.user.id,

        problem_name,

        platform,

        difficulty,

        topic,

        problem_link,

        solved_date,

        notes,

        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            return res.status(201).json({

                message: "Problem Added Successfully",

                id: result.insertId

            });

        }

    );

};

const getAllProblemsController = (req, res) => {

    getAllProblems(req.user.id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        return res.status(200).json({
            success: true,
            count: result.length,
            problems: result
        });
    });

};


const updateProblemController = (req, res) => {

    const { id } = req.params;
    const {
        problem_name,
        platform,
        difficulty,
        topic,
        problem_link,
        solved_date,
        notes
    } = req.body;

    updateProblem(
        id,
        req.user.id,
        problem_name,
        platform,
        difficulty,
        topic,
        problem_link,
        solved_date,
        notes,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Problem not found"
                });
            }

            return res.status(200).json({
                message: "Problem Updated Successfully"
            });

        }
    );

};

const deleteProblemController = (req, res) => {

    const { id } = req.params;
    deleteProblem(id, req.user.id, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Problem Not Found"
            });
        }

        return res.status(200).json({
            message: "Problem Deleted Successfully"
        });
    });
};

const getDifficultyStatsController = (req, res) => {

    getDifficultyStats(req.user.id, (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Database Error"
            });

        }

        return res.status(200).json({
            success: true,
            stats: result
        });

    });

};


const getTopicStatsController = (req, res) => {

    getTopicStats(req.user.id, (err, result) => {
        if (err) {

            return res.status(500).json({
                message: "Database Error"
            });
        }
        return res.status(200).json({
            success: true,
            stats: result
        });
    });
};

const getStreakController = (req, res) => {
    getSolvedDates(req.user.id, (err, result) => {
        if (err) {

            return res.status(500).json({
                message: "Database Error"
            });
        }
        if (result.length === 0) {
            return res.json({
                currentStreak: 0
            });
        }
        let streak = 1;
        for (let i = 0; i < result.length - 1; i++) {
            const current = new Date(result[i].solved_date);
            const previous = new Date(result[i + 1].solved_date);
            const diff =
                (current - previous) /
                (1000 * 60 * 60 * 24);
            if (diff === 1) {
                streak++;
            } else {
                break;
            }
        }
        return res.status(200).json({
            success: true,
            currentStreak: streak
        });
    });
};


const getDashboardController = (req, res) => {

    const userId = req.user.id;
    getTotalProblems(userId, (err, totalResult) => {
        if (err)
            return res.status(500).json({
                message: "Database Error"
            });

        getDifficultyStats(userId, (err, difficultyResult) => {
            if (err)
                return res.status(500).json({
                    message: "Database Error"
                });

            getTopicStats(userId, (err, topicResult) => {
                if (err)
                    return res.status(500).json({
                        message: "Database Error"
                    });

                getSolvedDates(userId, (err, streakResult) => {
                    if (err)
                        return res.status(500).json({
                            message: "Database Error"
                        });

                    let streak = 0;
                    if (streakResult.length > 0) {
                        streak = 1;
                        for (let i = 0; i < streakResult.length - 1; i++) {
                            const current =
                                new Date(streakResult[i].solved_date);
                            const previous =
                                new Date(streakResult[i + 1].solved_date);
                            const diff =
                                (current - previous) /
                                (1000 * 60 * 60 * 24);
                            if (diff === 1)
                                streak++;
                            else
                                break;
                        }
                    }
                    return res.status(200).json({
                        success: true,
                        totalProblems:
                            totalResult[0].totalProblems,
                        difficulty:
                            difficultyResult,
                        topics:
                            topicResult,
                        currentStreak:
                            streak
                    });
                });
            });
        });
    });

};




module.exports = {
    addProblemController,
    getAllProblemsController,
    updateProblemController,
    deleteProblemController,
    getDifficultyStatsController,
    getTopicStatsController,
    getStreakController,
    getDashboardController
};