/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import { middleware } from '#start/kernel'
const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')

// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead. If you want, you can pass proxy url as second argument here.
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
})
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/users', [UsersController, 'index']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.post('/users', [UsersController, 'store'])
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout']).use(
  middleware.auth({
    guards: ['api'],
  })
)
