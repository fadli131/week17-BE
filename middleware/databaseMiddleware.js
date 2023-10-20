const dbConnection = require('../db');

const databaseMiddleware = async (req, res, next) => {
    const { db, booksCollection, usersCollection } = await dbConnection();
    req.db = db;
    req.booksCollection = booksCollection; 
    req.usersCollection = usersCollection; 
    next();
};

module.exports = databaseMiddleware;

