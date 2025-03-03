import { Schema, model } from "mongoose"

const companySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "The company name field must be filled"],
            unique: true,
            trim: true,
            maxLength: [100, "Name length exceeds maximum allowed (100 characters)"]
        },
        description: {
            type: String,
            required: [true, "A description of the company is mandatory"],
            maxLength: [500, "Description text is too long (max 500 characters)"]
        },
        trajectoryYears: {
            type: Number,
            required: [true, "Company experience in years is needed"],
            min: [0, "Experience years must be a positive number"]
        },
        impactLevel: {
            type: String,
            required: [true, "Please specify the impact level"],
            enum: ["Bajo", "Medio", "Alto"]
        },
        status: {
            type: Boolean,
            default: true
        },

        category: {
            type: String,
            required: [true, "Business category must be selected"],
            maxLength: [100, "Category name is too long (max 100 characters)"]
        }
    }
)

export default model("Company", companySchema)