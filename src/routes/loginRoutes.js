const router = require('express').Router();
const { userLoginControllers } = require('../controllers')

router.route('/api/login')
    .post(userLoginControllers.create)

module.exports = router

