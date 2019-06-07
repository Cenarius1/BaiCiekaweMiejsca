const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = {
    secretOrKey: "cjREYgl1Mm45BDAvMhul",
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('bearer')
}