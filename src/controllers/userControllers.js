const bcrypt = require('bcryptjs')

const { User } = require('../models')
const { passwordValidator } = require('../utils')

const list = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const detail = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const create = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            confirmPassword
        } = req.body

        if (!name || !email || !password || !confirmPassword) {
            res.status(400).json({ success: false, message: 'Fill in all fields!' });
        }

        if (await User.findOne({ email })) {
            res.status(409).json({ success: false, message: 'This email is already in use.' });
        }

        if (password !== confirmPassword) {
            res.status(400).json({ success: false, message: 'The passwords entered do not match' })
        }
        
        if (!passwordValidator(password)) {
            res.status(400).json({ success: false, message: 'The password provided is not strong enough' })
        }

        const hash = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hash,
            permission: 1
        })

        newUser.password = undefined

        res.status(201).json({ success: true, message: 'User created successfully.', data: newUser });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const edit = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
        }

        const {
            name,
            email,
            password,
            confirmPassword,
            permission,
        } = req.body

        let hash = user.password

        if (email !== user.email && await User.findOne({ where: { email } })) {
            return res.status(409).json({ success: false,  message: 'This email is already in use.' });
        }

        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                res.status(400).json({ success: false, message: 'The passwords entered do not match' })
            }
            
            if (!passwordValidator(password)) {
                res.status(400).json({ success: false, message: 'The password provided is not strong enough' })
            }

            hash = await bcrypt.hash(password, 10)
        }

        const actualData = new Date()
        const formartDateHour =  actualData.toISOString()
        console.log(formartDateHour)

        const userUpdate = await User.findByIdAndUpdate(id, {
            name,
            email,
            password: hash,
            permission,
            updated_at: formartDateHour
        })

        userUpdate.password = undefined

        res.status(200).json({ success: true, message: 'User updated successfully.', data: userUpdate });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
        }

        const userDelete = await User.findByIdAndDelete(id)

        res.status(200).json({ success: true, message: 'User removed successfully.', data: userDelete });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = {
    list,
    detail,
    create,
    edit,
    remove
}
