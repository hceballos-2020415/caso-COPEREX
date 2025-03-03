import { Router } from 'express'
import { generateReport, downloadReport } from './report.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/generateReport', validateJwt, generateReport)
api.get('/download', validateJwt, downloadReport)

export default api