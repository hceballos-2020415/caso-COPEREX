import { Router } from 'express'
import { login } from './auth.controller.js'
import { loginValidator } from '../../helpers/validators.js'

const api = Router()

api.post('/login', [loginValidator], login)

export default api