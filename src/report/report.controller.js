import ExcelJS from "exceljs"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import Company from "../company/company.model.js"

// Configuración de rutas
const currentFilePath = fileURLToPath(import.meta.url)
const currentDirPath = path.dirname(currentFilePath)
const reportsDirectory = path.join(currentDirPath, "../reports")

// Generar reporte de empresas
export const generateReport = async (req, res) => {
    try {
        // Obtener datos de empresas
        const companyData = await Company.find()
        
        // Verificar si hay datos para el reporte
        if (!companyData.length) {
            return res.status(404).json({ 
                message: "No companies found to generate report" 
            })
        }
        
        // Crear libro y hoja de trabajo
        const excel = new ExcelJS.Workbook()
        const sheet = excel.addWorksheet("Companies Report")
        
        // Definir columnas
        sheet.columns = [
            { header: "Company Name", key: "name", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Impact Level", key: "impactLevel", width: 15 },
            { header: "Trajectory (Years)", key: "trajectoryYears", width: 15 },
            { header: "Category", key: "category", width: 20 },
            { header: "Status", key: "status", width: 10 }
        ]
        
        // Añadir filas con datos
        companyData.forEach(company => {
            sheet.addRow({
                name: company.name,
                description: company.description,
                impactLevel: company.impactLevel,
                trajectoryYears: company.trajectoryYears,
                category: company.category,
                status: company.status ? "Active" : "Inactive"
            })
        })
        
        // Asegurar que existe el directorio de reportes
        if (!fs.existsSync(reportsDirectory)) {
            fs.mkdirSync(reportsDirectory, { recursive: true })
        }
        
        // Guardar archivo
        const outputPath = path.join(reportsDirectory, "Companies_Report.xlsx")
        await excel.xlsx.writeFile(outputPath)
        
        return res.json({ 
            message: "Report generated successfully", 
            downloadUrl: `/reports/Companies_Report.xlsx` 
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ 
            message: "General error when generating report", 
            error: error.toString() 
        })
    }
}

// Descargar reporte generado
export const downloadReport = async (req, res) => {
    try {
        const reportFilePath = path.join(reportsDirectory, "Companies_Report.xlsx")
        
        // Verificar existencia del archivo
        if (!fs.existsSync(reportFilePath)) {
            return res.status(404).json({ 
                message: "Report not found, generate it first" 
            })
        }
        
        // Enviar archivo para descarga
        return res.download(reportFilePath, "Companies_Report.xlsx")
    } catch (error) {
        console.error(error)
        return res.status(500).json({ 
            message: "General error when downloading report", 
            error: error.toString() 
        })
    }
}