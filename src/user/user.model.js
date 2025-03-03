import { Schema, model } from 'mongoose'

const userSchema = Schema(
    {  
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [50, `Name can't exceed 50 characters`],
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [50, `Surname can't exceed 50 characters`],
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            maxLength: [20, `Username can't exceed 20 characters`],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be at least 8 characters'],
            maxLength: [100, `Password can't exceed 100 characters`],
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            maxLength: [15, `Phone can't exceed 15 characters`],
            minLength: [8, 'Phone must be at least 8 characters']
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum: ['ADMIN'],
            default: 'ADMIN'
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

userSchema.methods.toJSON = function(){
    const { __v, password, ...user} = this.toObject()
    return user
}

export default model('User', userSchema)