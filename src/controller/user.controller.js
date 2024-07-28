const user = require('../model/user.model'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const createuser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    const user1 = await user.findOne({ email });
    if (user1) {
        return res.status(409).send({ message: 'User Already Exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user2 = new user({ name, email, password: hashedPassword });
    await user2.save();
    const token = jwt.sign({ id: user2._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).send({
        success: true,
        message: 'Registration Successful',
        status:'201',
        user: {
            name: user2.name,
            email: user2.email,
            token
        }
    });
}
//loginUser-with-jwt-token
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    try {
        const user1 = await user.findOne({ email });
        if (!user1) {
            return res.status(404).send({ message: 'User Not Found' });
        }
        const isMatch = await user1.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid Credentials' });
        }
        const token = jwt.sign({ id: user1._id}, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).send({
            success: true,
            message: 'Login Successful',
            status:'200',
            user: {
                name: user1.name,
                email: user1.email,
                token
            }
        });
    } catch (error) {
        res.send({ message: error.message });
    }
}
//authentication middleware
const authenticateUser = async (req, res, next) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Invalid Token' });
    }

}

//userDelete with jwt token
const userDelete = async (req, res) => {
    const { id } = req.params;
    try{
        const user1 = await user.findById(id);
    if (!user1) {
        return res.status(404).send({ message: 'User Not Found' });
    }
    await user1.deleteOne({_id: id});
    res.status(200).send({ message: 'User Deleted Successfully' });
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}
//userLogout with jwt token
const userLogout = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        token.replace('');
        return res.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        console.log(req.user);
        res.status(200).send({ message: 'Logout Successful' });
    } catch (error) {
        res.status(401).send({ message: 'Invalid Token' });
    }
}

module.exports = { createuser, loginUser, userDelete, authenticateUser,userLogout }