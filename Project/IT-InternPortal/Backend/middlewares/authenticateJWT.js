const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {

    const token = req.header('Authorization')?.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return res.status(403).json({ message: 'Access denied' });
    }


    jwt.verify(token, 'your_jwt_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = authenticateJWT;
