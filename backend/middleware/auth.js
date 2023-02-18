// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'jamilisab$oy';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const customeToken = token.length < 500;
        let decodedData;
        if (token && customeToken) {
            decodedData = jwt.verify(token, JWT_SECRET)

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error)
    }
}

export default auth;