const db = require("../config/db");


const addTask = (
    userId,
    title,
    description,
    priority,
    due_date,
    callback
) => {
    const sql = `
        INSERT INTO study_tasks
        (
            user_id,
            title,
            description,
            priority,
            due_date
        )
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
        sql,
        [
            userId,
            title,
            description,
            priority,
            due_date
        ],
        callback
    );
};


const getAllTasks = (userId, callback) => {

    const sql = `
        SELECT *
        FROM study_tasks
        WHERE user_id = ?
        ORDER BY due_date ASC
    `;

    db.query(sql, [userId], callback);

};

const updateTask = (
    id,
    userId,
    title,
    description,
    priority,
    due_date,
    callback
) => {

    const sql = `
        UPDATE study_tasks
        SET
            title = ?,
            description = ?,
            priority = ?,
            due_date = ?
        WHERE
            id = ?
            AND user_id = ?
    `;

    db.query(
        sql,
        [
            title,
            description,
            priority,
            due_date,
            id,
            userId
        ],
        callback
    );

};

const completeTask = (id, userId, callback) => {

    const sql = `
        UPDATE study_tasks
        SET status = 'Completed'
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(sql, [id, userId], callback);

};


const deleteTask = (id, userId, callback) => {

    const sql = `
        DELETE FROM study_tasks
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(sql, [id, userId], callback);

};

const getTodayTasks = (userId, callback) => {

    const sql = `
        SELECT *
        FROM study_tasks
        WHERE
            user_id = ?
            AND due_date = CURDATE()
        ORDER BY priority DESC
    `;

    db.query(sql, [userId], callback);

};

const getPendingTasks = (userId, callback) => {

    const sql = `
        SELECT *
        FROM study_tasks
        WHERE
            user_id = ?
            AND status = 'Pending'
        ORDER BY due_date ASC
    `;

    db.query(sql, [userId], callback);

};

const getRecentTasks = (userId, callback) => {

    const sql = `
        SELECT
            id,
            title,
            priority,
            status,
            due_date
        FROM study_tasks
        WHERE user_id = ?
        ORDER BY due_date ASC
        LIMIT 5
    `;

    db.query(sql, [userId], callback);

};


module.exports = {
    addTask, getAllTasks,
    updateTask, completeTask, deleteTask, 
    getTodayTasks, getPendingTasks, getRecentTasks
};