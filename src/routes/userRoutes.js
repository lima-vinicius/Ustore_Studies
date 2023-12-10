const router = require('express').Router();
const { userControllers } = require('../controllers')

router.route('/api/user')
    .get(userControllers.list)
    .post(userControllers.create)

module.exports = router
