const db = require("../config/db");
const {getSolvedDates} = require("../models/dsaModel");

const getUserInfo = (userId, callback) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            college,
            branch
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [userId], callback);

};

const getResumeInfo = (userId, callback) => {

    const sql = `
        SELECT
            resume,
            resume_score
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [userId], callback);

};

const getTotalProblems = (userId, callback) => {

    const sql = `
        SELECT COUNT(*) AS totalProblems
        FROM dsa_problems
        WHERE user_id = ?
    `;

    db.query(sql, [userId], callback);

};


module.exports = {
    getUserInfo, getResumeInfo, 
    getTotalProblems
};