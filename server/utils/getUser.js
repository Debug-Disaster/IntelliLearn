const jwt = require('jsonwebtoken');
const User = require('../models/user');
const getUser = async(primaryToken, refreshToken) => {
    try{
        const verifiedPrimary = jwt.verify(primaryToken, process.env.SECRET_KEY);
        if(verifiedPrimary.email){
            const email = verifiedPrimary.email
            const user = await User.findOne({email}).select('-password -emailConfirmationCode')
            console.log(user)
            return {user};
        }else{
                const refreshVerified = jwt.verify(refreshToken, process.env.SECOND_SECRET_KEY);
                if(refreshVerified){
                    const {newToken, newRefreshToken} = await generateToken(refreshVerified.last_name, refreshVerified.first_name, refreshVerified.email, refreshVerified.role)
                    const refreshedUser = await User.findOne({email: refreshVerified.email})
                    return {user: refreshedUser, newPrimaryToken: newToken, newRefreshToken: newRefreshToken}
                }
        }
        return null
    }catch(err){
        console.log(err)
        if (err.name === 'TokenExpiredError') {
                const refreshVerified = jwt.verify(refreshToken, process.env.SECOND_SECRET_KEY);
                if (refreshVerified) {
                   try{
                        const user = await User.findOne({email: refreshVerified.email}).select('-password -emailConfirmationCode')
                        const {newToken, newRefreshToken} = await generateToken(refreshVerified.last_name, refreshVerified.first_name, refreshVerified.email, refreshVerified.role)
                        return {user, newPrimaryToken: newToken, newRefreshToken}
                   }catch(err){
                     return null;
                   }
                }
        }
        return null;
    }
}
module.exports = getUser