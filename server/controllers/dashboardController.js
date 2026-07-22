const {getUserInfo, getResumeInfo, getTotalProblems
} = require("../models/dashboardModel");

const {getSolvedDates, getDifficultyStats, 
    getTopicStats, getWeeklyProgress} = require("../models/dsaModel");

const {
    getPendingTasks,
    getTodayTasks,
    getRecentTasks
} = require("../models/plannerModel");

const {
    calculateCurrentStreak
} = require("../utils/streakHelper"); 



const getDashboardController = (req, res) => {
    const userId = req.user.id;
    getUserInfo(userId, (err, userResult) => {

        if (err){

            return res.status(500).json({
                message: "Database Error"
            });
        }
        getResumeInfo(userId, (err, resumeResult) => {

            if (err){

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            getTotalProblems(userId, (err, dsaResult) => {

                if (err) {


                    return res.status(500).json({
                        message:"Database Error"
                    });
                }

                getSolvedDates(userId, (err, dateResult) => {

                    if (err) {
                        return res.status(500).json({
                            message: "Database Error"
                        });
                    }

                    const currentStreak = calculateCurrentStreak(dateResult);

                    getDifficultyStats(userId, (err, difficultyResult) => {

                        if (err) {
                            return res.status(500).json({
                                message: "Database Error"
                            });
                        }

                        getTopicStats(userId, (err, topicResult) => {

                            if (err) {
                                return res.status(500).json({
                                    message: "Database Error"
                                });
                            }

                                // If these functions already exist in plannerModel
                            getPendingTasks(userId, (err, pendingResult) => {

                                if (err) {
                                    return res.status(500).json({
                                        message: "Database Error"
                                    });
                                }

                                getTodayTasks(userId, (err, todayResult) => {

                                    if (err) {
                                        return res.status(500).json({
                                            message: "Database Error"
                                        });
                                    }
                                    getWeeklyProgress(userId, (err, weeklyResult) => {
                                        if (err) {
                                            return res.status(500).json({
                                                message: "Database Error"
                                            });
                                        }
                                        getRecentTasks(userId, (err, recentTasks) => {

                                            if (err) {
                                                return res.status(500).json({
                                                    message: "Database Error"
                                                });
                                            }

                                            const week = [
                                                "Sunday",
                                                "Monday",
                                                "Tuesday",
                                                "Wednesday",
                                                "Thursday",
                                                "Friday",
                                                "Saturday"
                                            ];
                                            const weeklyProgress = week.map(day => {

                                                const found = weeklyResult.find(item => item.day === day);

                                                return {
                                                    day,
                                                    total: found ? found.total : 0
                                                };
                                            });

                                            return res.status(200).json({

                                                success: true,

                                                user: userResult[0],

                                                resume: {
                                                    uploaded: resumeResult[0].resume !== null,
                                                    score: resumeResult[0].resume_score
                                                },

                                                dsa: {
                                                    totalProblems: dsaResult[0].totalProblems,
                                                    currentStreak,
                                                    difficulty: difficultyResult,
                                                    topics: topicResult
                                                },

                                                planner: {
                                                    pendingTasks: pendingResult.length,
                                                    todayTasks: todayResult.length,
                                                    recentTasks
                                                },
                                                weeklyProgress
                                            });

                                        });
                                    });   
                                });
                            });
                        });
                    });
                });
            });
        });    
    });
};    
module.exports = {
    getDashboardController
};