const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader;
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                return res.status(200).json({
                    errCode: 1,
                    message: 'invalid token',
                })
            } else {
                req.user = user;
                next();
            }
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'you are not authenticated'
        })
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(200).json({
                errCode: 1,
                message: 'you are not allow to do that'
            })
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(200).json({
                errCode: 1,
                message: 'you are not allow to do that'
            })
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };