const bcrypt = require('bcryptjs')

const { User } = require('../models')
const { passwordValidator } = require('../utils')

const list = async (req, res, next) => {
    try {
        const users = await User.find().select('-password')
        
        res.locals = {
            ...res.locals,
            data: users,
            status: 200
        }

        return next()
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
}

const detail = async (req, res, next) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if (!user) {
            return next({
                message: `User not found: ${id}`,
                status: 404,
            });
        }

        user.password = undefined

        res.locals = {
            ...res.locals,
            data: user,
            status: 200,
        };

        return next()
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
}

const create = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            confirmPassword,
            permission
        } = req.body

        if (!name || !email || !password || !confirmPassword) {
            return next({
                message: 'Fill in all fields',
                status: 400,
            });
        }

        if (await User.findOne({ email })) {
            return next({
                message: 'This email is already in use',
                status: 409,
            });
        }

        if (password !== confirmPassword) {
            return next({
                message: 'The passwords entered do not match',
                status: 400,
            });
        }
        
        if (!passwordValidator(password)) {
            return next({
                message: 'The password provided is not strong enough',
                status: 400,
            });
        }

        const hash = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hash,
            permission
        })

        newUser.password = undefined

        res.locals = {
            ...res.locals,
            message: 'User created successfully',
            data: newUser,
            status: 201,
        };

        return next()
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
}

const edit = async (req, res, next) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if (!user) {
            return next({
                message: `User not found: ${id}`,
                status: 404,
            });
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
            return next({
                message: 'This email is already in use',
                status: 409,
            });
        }

        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                return next({
                    message: 'The passwords entered do not match',
                    status: 400,
                });
            }
            
            if (!passwordValidator(password)) {
                return next({
                    message: 'The password provided is not strong enough',
                    status: 400,
                });
            }

            hash = await bcrypt.hash(password, 10)
        }

        const actualData = new Date()
        const formartDateHour =  actualData.toISOString()

        const userUpdate = await User.findByIdAndUpdate(id, {
            name,
            email,
            password: hash,
            permission,
            updated_at: formartDateHour
        })

        userUpdate.password = undefined

        res.locals = {
            ...res.locals,
            message: 'User updated successfully',
            data: userUpdate,
            status: 200,
        };

        return next()
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
}

const remove = async (req, res, next) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if (!user) {
            return next({
                message: `User not found: ${id}`,
                status: 404,
            });
        }

        await User.findByIdAndDelete(id)

        res.locals = {
            ...res.locals,
            message: 'User removed successfully',
            status: 204,
        };

        return next()
    } catch (error) {
        return next({
            message: error.message,
            status: 500
        })
    }
}

module.exports = {
    list,
    detail,
    create,
    edit,
    remove
}
