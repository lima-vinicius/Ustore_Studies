const { User } = require('../models')

const list = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const create = async (req, res) => {
    try {
        const {
            name,
            email
        } = req.body

        if (!name || !email) {
            res.status(400).json({ success: false, message: 'Fill in all fields!' });
        }

        if (await User.findOne({ email })) {
            res.status(409).json({ success: false, message: 'This email is already in use.' });
        }

        const newUser = await User.create({
            name,
            email
        })

        res.status(201).json({ success: true, message: 'User created successfully.', data: newUser });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = {
    list,
    create
}