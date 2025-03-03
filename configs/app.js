'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { limiter } from '../middlewares/rate.limit.js'
import authRoutes from '../src/auth/auth.routes.js'
import companyRoutes from '../src/company/company.routes.js'
import reportRoutes from '../src/report/report.routes.js'

export const initServer = () => {
    const app = express()
    const PORT = process.env.PORT || 3626

    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)

    app.use('/api/auth', authRoutes)
    app.use('/api/company', companyRoutes)
    app.use('/api/report', reportRoutes)

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}