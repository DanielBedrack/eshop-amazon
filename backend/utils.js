import jwt from 'jsonwebtoken'

export const genrateToken= (user) => {
    return jwt.sign({_id: user._id, name: user.name, email: user.email}, process.env.JWT_PW,{expiresIn: '15d'})
}