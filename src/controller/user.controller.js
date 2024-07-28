const user = require('../model/user.model'); 
const createuser = async (req, res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    try {
        const oldUser = await user.findOne({ email });
        if (oldUser) {
            return res.status(400).send({ message: 'User Already Exists' });
        }
        await user.create({ name, email, password });
        res.status(201).send({ 
            success: true, 
            message: 'User Created Successfully',
            status:'201',
            user: { name, email, password }});
    } catch (error) {
        res.send({ message: error.message });
    }
}

module.exports = { createuser }