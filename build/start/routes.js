import router from '@adonisjs/core/services/router';
import AutoSwagger from 'adonis-autoswagger';
import swagger from '#config/swagger';
import { middleware } from '#start/kernel';
const AuthController = () => import('#controllers/auth_controller');
const UsersController = () => import('#controllers/users_controller');
router.get('/swagger', async () => {
    return AutoSwagger.default.docs(router.toJSON(), swagger);
});
router.get('/docs', async () => {
    return AutoSwagger.default.ui('/swagger', swagger);
});
router.get('/', async () => {
    return {
        hello: 'world',
    };
});
router.get('/users', [UsersController, 'index']).use(middleware.auth({
    guards: ['api'],
}));
router.post('/users', [UsersController, 'store']);
router.post('/login', [AuthController, 'login']);
router.post('/logout', [AuthController, 'logout']).use(middleware.auth({
    guards: ['api'],
}));
//# sourceMappingURL=routes.js.map