const Router = require('express')
const { blogController } = require('../controllers')
const { auth, role } = require('../middlewares')

const blogRoutes = Router()


blogRoutes.post('/', auth, role(['admin']), blogController.create)
blogRoutes.put('/:id', auth, role(['admin']), blogController.update)
blogRoutes.get('/', auth, role(['admin', 'user']), blogController.getAll)
blogRoutes.get('/:id', auth, role(['admin', 'user']), blogController.getById)
blogRoutes.delete('/:id', auth, role(['admin']), blogController.delete)


module.exports = blogRoutes