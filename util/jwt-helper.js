const jwt = require('jsonwebtoken');

const expireTime = '1d'; // expires in one day
const resetExpireTime = '1h'; // expires in one hour

generateToken = (user) => {
    return token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: expireTime
    });
}

generateTokenForReset = (user) => {
    return token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: resetExpireTime
    });
}

decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        return err;
    }
}


module.exports = {
    generateToken: generateToken,
    generateTokenForReset: generateTokenForReset,
    decodeToken: decodeToken
}