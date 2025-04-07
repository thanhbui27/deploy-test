import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * @login
   * @operationId login
   * @summary Login user
   * @description Login user
   * @tags Auth
   *
   * @requestBody {"email":"test@gmail.com", "password":"123456"}
   *
   * @responseBody 200 - {"status": true, "data": {"access_token": "string"}, "message": "Success"}
   * @responseBody 400 - {"status": false, "message": "Invalid credentials"}
   * @responseBody 401 - {"status": false, "message": "Invalid credentials"}
   * @responseBody 404 - {"status": false, "message": "User not found"}
   */
  public async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.all()
    const user = await User.findBy('email', email)
    if (!user) {
      return response.status(401).json({ message: 'Invalid credentials' })
    }
    const isValid = await user.verifyPassword(password)
    if (!isValid) {
      return response.status(401).json({ message: 'Invalid credentials' })
    } else {
      const token = await auth.use('api').createToken(user)
      return response.status(200).json({ access_token: token.value?.release() })
    }
  }
  /**
   * @logout
   * @operationId logout
   * @summary logout user
   * @description logout user
   * @tags Auth
   *
   *
   * @responseBody 200 - {"status": true, "data": {"access_token": "string"}, "message": "Success"}
   * @responseBody 400 - {"status": false, "message": "Invalid credentials"}
   * @responseBody 401 - {"status": false, "message": "Invalid credentials"}
   * @responseBody 404 - {"status": false, "message": "User not found"}
   */
  public async logout({ auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()
    return response.status(200).json({ message: 'Logged out successfully' })
  }
}
