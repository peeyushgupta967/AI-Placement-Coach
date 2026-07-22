const db = require("../config/db");

const createUser = (
    name,
    email,
    password,
    verificationToken,
    verificationExpires,
    callback
) => {

    const sql = `
        INSERT INTO users
        (
            name,
            email,
            password,
            verification_token,
            verification_expires
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            email,
            password,
            verificationToken,
            verificationExpires
        ],
        callback
    );

};


const updateUserProfile = (id, name, college, branch, graduation_year,career_goal, callback) => {

    const sql = `
        UPDATE users
        SET
            name = ?,
            College = ?,
            branch = ?,
            graduation_year = ?,
            career_goal = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [name, college, branch, graduation_year,career_goal, id],
        callback
    );

};



const getUserByEmail = (email, callback) => {

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);

};

const getUserById = (id, callback) => {
    const sql = "SELECT id, name, email, college,branch, graduation_year, career_goal, resume FROM users WHERE id = ?";
    db.query(sql, [id], callback);

};

const updateResume = (id, resumePath, callback) => {

    const sql = `
        UPDATE users
        SET resume = ?
        WHERE id = ?
    `;

    db.query(sql, [resumePath, id], callback);

};


const getResumePath = (id, callback) => {
    const sql = "SELECT resume FROM users WHERE id = ?";

    db.query(sql, [id], callback);
};


const deleteResume = (id, callback) => {

    const sql = `
        UPDATE users
        SET resume = NULL
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};
const updateResumeScore = (userId, score, callback) => {

    const sql = `
        UPDATE users
        SET resume_score = ?
        WHERE id = ?
    `;

    db.query(sql, [score, userId], callback);

};

const verifyEmail = (token, callback) => {

    const sql = `
        UPDATE users
        SET
            is_verified = TRUE,
            verification_token = NULL,
            verification_expires = NULL
        WHERE
            verification_token = ?
            AND verification_expires > NOW()
    `;

    db.query(sql, [token], callback);

};


module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateResume,
    updateUserProfile,
    getResumePath,
    deleteResume,
    updateResumeScore,
    verifyEmail
};