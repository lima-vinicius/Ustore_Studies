const router = require('express').Router();
const { userControllers } = require('../controllers')

router.route('/api/user')
    .get(userControllers.list)
    .post(userControllers.create)

router.route('/api/user/:id')
    .get(userControllers.detail)
    .put(userControllers.edit)
    .delete(userControllers.remove)

module.exports = router
