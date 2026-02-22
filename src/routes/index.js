const { Router } = require('express')
const testRoutes = require('./test.routes')
const authRoutes = require('./auth.routes')
const blogRoutes = require('./blog.routes')
const router = Router()

router.use('/test', testRoutes)
router.use('/auth', authRoutes)
router.use('/blog', blogRoutes)


module.exports = router