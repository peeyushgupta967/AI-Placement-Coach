const db = require("../config/db");

const addProblem = (
    userId,
    problem_name,
    platform,
    difficulty,
    topic,
    problem_link,
    solved_date,
    notes,
    callback
) => {

    const sql = `
        INSERT INTO dsa_problems
        (
            user_id,
            problem_name,
            platform,
            difficulty,
            topic,
            problem_link,
            solved_date,
            notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
        sql,
        [
            userId,
            problem_name,
            platform,
            difficulty,
            topic,
            problem_link,
            solved_date,
            notes
        ],
        callback
    );
};


const getAllProblems = (userId, callback) => {

    const sql = `
        SELECT *
        FROM dsa_problems
        WHERE user_id = ?
        ORDER BY solved_date DESC
    `;

    db.query(sql, [userId], callback);

};


const updateProblem = (
    id,
    userId,
    problem_name,
    platform,
    difficulty,
    topic,
    problem_link,
    solved_date,
    notes,
    callback
) => {

    const sql = `
        UPDATE dsa_problems
        SET
            problem_name = ?,
            platform = ?,
            difficulty = ?,
            topic = ?,
            problem_link = ?,
            solved_date = ?,
            notes = ?
        WHERE
            id = ?
            AND user_id = ?
    `;

    db.query(
        sql,
        [
            problem_name,
            platform,
            difficulty,
            topic,
            problem_link,
            solved_date,
            notes,
            id,
            userId
        ],
        callback
    );

};

const deleteProblem = (id, userId, callback) => {

    const sql = `
        DELETE FROM dsa_problems
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(sql, [id, userId], callback);

};


const getDifficultyStats = (userId, callback) => {

    const sql = `
        SELECT
            difficulty,
            COUNT(*) AS total
        FROM dsa_problems
        WHERE user_id = ?
        GROUP BY difficulty
    `;

    db.query(sql, [userId], callback);

};


const getTopicStats = (userId, callback) => {

    const sql = `
        SELECT
            topic,
            COUNT(*) AS total
        FROM dsa_problems
        WHERE user_id = ?
        GROUP BY topic
        ORDER BY total DESC`;
    db.query(sql, [userId], callback);
};


const getSolvedDates = (userId, callback) => {

    const sql = `
        SELECT solved_date
        FROM dsa_problems
        WHERE user_id = ?
        ORDER BY solved_date DESC
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


const getWeeklyProgress = (userId, callback) => {

    const sql = `
        SELECT
            DAYOFWEEK(solved_date) AS dayNumber,
            DAYNAME(solved_date) AS day,
            COUNT(*) AS total
        FROM dsa_problems
        WHERE
            user_id = ?
            AND YEARWEEK(solved_date, 1) = YEARWEEK(CURDATE(), 1)
        GROUP BY dayNumber, day
        ORDER BY dayNumber;
    `;

    db.query(sql, [userId], callback);

};
module.exports = {
    addProblem,
    getAllProblems,
    updateProblem,
    deleteProblem,
    getDifficultyStats,
    getTopicStats,
    getSolvedDates,
    getTotalProblems,
    getWeeklyProgress

};