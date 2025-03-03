'use strict'
 
import jwt from 'jsonwebtoken'
 
export const generateJwt = async(payload) => {
    try {
        return jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: '8h',
                algorithm: 'HS256'
            }
        )
    } catch(err) {
        console.error(err)
        return err
    }
}

export const verifyJwt = async(token) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch(err) {
        console.error(err)
        return null
    }
}