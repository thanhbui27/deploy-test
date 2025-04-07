import User from '#models/user';
class UsersController {
    async index({ response }) {
        const users = await User.all();
        return response.json(users);
    }
    async store({ request, response }) {
        const { fullName, email, password } = request.body();
        const user = await User.create({
            fullName,
            email,
            password,
        });
        return response.status(201).json(user);
    }
}
export default UsersController;
//# sourceMappingURL=users_controller.js.map