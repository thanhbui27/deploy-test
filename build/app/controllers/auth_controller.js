import User from '#models/user';
export default class AuthController {
    async login({ request, auth, response }) {
        const { email, password } = request.all();
        const user = await User.findBy('email', email);
        if (!user) {
            return response.status(401).json({ message: 'Invalid credentials' });
        }
        const isValid = await user.verifyPassword(password);
        if (!isValid) {
            return response.status(401).json({ message: 'Invalid credentials' });
        }
        else {
            const token = await auth.use('api').createToken(user);
            return response.status(200).json({ access_token: token.value?.release() });
        }
    }
    async logout({ auth, response }) {
        await auth.use('api').invalidateToken();
        return response.status(200).json({ message: 'Logged out successfully' });
    }
}
//# sourceMappingURL=auth_controller.js.map