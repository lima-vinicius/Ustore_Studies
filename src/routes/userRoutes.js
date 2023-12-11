const router = require('express').Router();
const { userControllers } = require('../controllers')
const { authorizationMiddleware } = require('../helpers')

router.route('/api/user')
    .get(authorizationMiddleware([1,2,3]), userControllers.list)
    .post(userControllers.create)

router.route('/api/user/:id')
    .get(authorizationMiddleware([1,2]), userControllers.detail)
    .put(authorizationMiddleware([1]), userControllers.edit)
    .delete(authorizationMiddleware([1]), userControllers.remove)

module.exports = router
