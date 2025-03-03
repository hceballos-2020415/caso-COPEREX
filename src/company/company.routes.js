import { Router } from "express"
import { save, getAll, update, filterCompanies  } from "./company.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post("/save", [validateJwt], save)
api.put("/update/:id", [validateJwt], update)
api.post("/filter", [validateJwt], filterCompanies)
api.get("/", [validateJwt], getAll)


export default api
