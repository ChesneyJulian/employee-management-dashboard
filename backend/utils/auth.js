const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET
const timeOut = '1h';

module.exports = {
    signToken: ( employeeData ) => {
        const payload =  employeeData.dataValues ;
        const token = jwt.sign({ data: payload }, secret, { expiresIn: timeOut });
        return token;
    }
};