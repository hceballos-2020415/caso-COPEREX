import Company from "./company.model.js"

// Guardar una nueva empresa
export const save = async (req, res) => {
    try {
        const { body: data } = req
        
        // Verificar si la empresa ya existe
        const existingCompany = await Company.findOne({ name: data.name })
        
        if (existingCompany) {
            return res.status(400).json({
                message: "Company name already exists"
            })
        }
        
        // Crear y guardar la nueva empresa
        const newCompany = await Company.create(data)
        
        return res.status(201).json({
            message: `Company ${newCompany.name} registered successfully`,
            company: newCompany
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "General error when adding company",
            error: error.toString()
        })
    }
}

// Obtener todas las empresas
export const getAll = async (req, res) => {
    try {
        // Buscar todas las empresas
        const companies = await Company.find()
        
        // Verificar si hay empresas
        if (!companies.length) {
            return res.status(404).json({
                message: "No companies found"
            })
        }
        
        return res.json({
            message: "All companies retrieved successfully",
            companies
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "General error when fetching companies",
            error: error.toString()
        })
    }
}

// Filtrar empresas
export const filterCompanies = async (req, res) => {
    try {
        const { category, impactLevel, orderBy } = req.body
        
        // Configurar filtros
        const filters = {}
        if (category) filters.category = category
        if (impactLevel) filters.impactLevel = impactLevel
        
        // Configurar ordenamiento
        const sortOptions = {}
        if (orderBy) {
            switch (orderBy) {
                case "A-Z":
                    sortOptions.name = 1
                    break
                case "Z-A":
                    sortOptions.name = -1
                    break
                case "trajectory":
                    sortOptions.trajectoryYears = -1
                    break
            }
        }
        
        // Buscar con filtros y ordenamiento
        const companies = await Company.find(filters).sort(sortOptions)
        
        if (!companies.length) {
            return res.status(404).json({
                message: "No companies found"
            })
        }
        
        return res.json({
            message: "Filtered companies retrieved",
            companies
        })
    } catch (error) {
        console.error("Error filtering companies:", error)
        return res.status(500).json({
            message: "Error filtering companies",
            error: error.message
        })
    }
}

// Actualizar una empresa
export const update = async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.body
        
        // Actualizar y obtener la empresa actualizada
        const updatedCompany = await Company.findOneAndUpdate(
            { _id: id },
            updates,
            { new: true, runValidators: true }
        )
        
        if (!updatedCompany) {
            return res.status(404).json({
                message: "Company not found"
            })
        }
        
        return res.json({
            message: "Company updated successfully",
            updatedCompany
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "General error when updating company",
            error: error.toString()
        })
    }
}