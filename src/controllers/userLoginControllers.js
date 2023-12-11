const bcrypt = require('bcryptjs')

const { User } = require('../models')
const generateToken = require('../config/generateToken')


const create = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            res.status(404).json({ success: false, message: 'Email not found' });
        }
        
        if (!await bcrypt.compare(password, user.password)) {
            res.status(404).json({ success: false, message: 'Wrong password' });
        }

        user.password = undefined

        res.status(200).json({ success: true, message: 'Login successfully.', data: { user, token: generateToken({ id: user.id }) } });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = {
    create
}
