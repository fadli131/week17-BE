const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SIGN } = require('../config/jwt');

const validRoles = ['admin', 'user']

const register = async (req, res) => {
    const userCollection = req.usersCollection;
    const {username, password, role} = req.body;

    try {
        if (username ==='') {
            throw new Error('username can not be blank');
        } 
        if (!validRoles.includes(role)) {
            throw new Error('Invalid role')
        }
        const user = await userCollection.findOne({ username });
        if (user) {
            throw new Error('usernmae is already exist')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await req.usersCollection.insertOne({ username, password: hashedPassword, role});
        res.status(200).json({
            message: 'user successfully registered'
        })
        
    } catch (error) {
        res.status(401).json({
            error: error.message
        })
    }
}

const login = async (req, res) => {
    const { usersCollection } = req;
    const { username, password } = req.body
    const user = await usersCollection.findOne({ username })

    if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (isPasswordCorrect) {
            const token = jwt.sign({username: user.username, id: user._id, role: user.role}, JWT_SIGN)
            res.status(200).json({
                message: "user successfully logged in",
                data: token
            })
        } else {
            res.status(400).json({ error: "password is incorrect"})
        }
    } else {
        res.status(400).json({ error: "user not found"})
       }
}

module.exports = {
    register,
    login
}
