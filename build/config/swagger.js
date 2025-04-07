import path from 'node:path';
import url from 'node:url';
export default {
    path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
    title: 'Foo',
    version: '1.0.0',
    description: '',
    tagIndex: 2,
    productionEnv: 'production',
    info: {
        title: 'title',
        version: '1.0.0',
        description: '',
    },
    snakeCase: true,
    debug: true,
    ignore: ['/swagger', '/docs'],
    preferredPutPatch: 'PUT',
    common: {
        parameters: {},
        headers: {},
    },
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
        },
    },
    authMiddlewares: ['auth', 'auth:api'],
    defaultSecurityScheme: 'BearerAuth',
    persistAuthorization: true,
    showFullPath: false,
};
//# sourceMappingURL=swagger.js.map