const bcrypt = require('bcryptjs')

const { User } = require('../models')
const { generateToken } = require('../utils')

const create = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return next({
                message: 'Email not found',
                status: 404,
            });
        }
        
        if (!await bcrypt.compare(password, user.password)) {
            return next({
                message: 'Wrong password',
                status: 404,
            });
        }

        user.password = undefined

        res.locals = {
            ...res.locals,
            message: 'Login successfully',
            data: { 
                user, 
                token: generateToken({ id: user.id }) 
            },
            status: 200,
        }

        next()

    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
}

module.exports = {
    create
}
