import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

class UsersController {
  /**
   * @index
   * @operationId get users
   * @summary Get all users
   * @description Get all users
   * @tags User
   * @bearerAuth []
   *
   */
  public async index({ response }: HttpContext) {
    const users = await User.all()
    return response.json(users)
  }

  /**
   * @store
   * @operationId create user
   * @summary Create a new user
   * @description Create a new user
   * @tags User
   *
   *
   */
  public async store({ request, response }: HttpContext) {
    const { fullName, email, password } = request.body()
    const user = await User.create({
      fullName,
      email,
      password,
    })

    return response.status(201).json(user)
  }
}

export default UsersController
