const {Router} = require('express')
const bookController = require('../controller/bookController')
const {authorizationMiddlewareAll} = require('../middleware/authorizationMiddleware')

const router = Router();

router.post('/', authorizationMiddlewareAll, bookController.createBook)

router.get('/', authorizationMiddlewareAll, bookController.getAllBook)

router.put('/:id', authorizationMiddlewareAll, bookController.updateBook)

router.delete('/:id', authorizationMiddlewareAll, bookController.deleteBook)

module.exports = router;