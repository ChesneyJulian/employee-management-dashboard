const jwt = require('jsonwebtoken');

const secret = 'shhhhhhhh';
const timeOut = '1h';

module.exports = {
    authMiddleware: ({ req }) => {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
          }
      
          if (!token) return req;
      
          try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
            console.log(req.user);
          } catch {
            console.log('Invalid token');
          }
      
          return req;
    },
    signToken: ( employeeData ) => {
        const payload =  employeeData.dataValues ;
        console.log('payload ',payload);
        const token = jwt.sign({ data: payload }, secret, { expiresIn: timeOut });
        return token;
    }
};