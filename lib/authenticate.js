const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (!req.cookies.mzklabelauth) {
        res.locals.user = null
    } else {
        const token = req.cookies.mzklabelauth;
        const decodedToken = jwt.decode(token, { complete: true }) || {} ;
        res.locals.user = decodedToken.payload;
    }

    return next();
}
