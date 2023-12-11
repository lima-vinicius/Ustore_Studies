const { User } = require('../models')

module.exports = async (rulePermission, id) => {
    const user = await User.findById(id)

    if (rulePermission.indexOf(user.permission) === -1 ) {
        return false
    }

    return true
}