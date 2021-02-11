const bcr = require('bcrypt')
const model = require('../Models/users')
const response = require('../Helpers/response');
const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger');

class Auth {
    setToken = async (email, username, role) => {
        try {

            const payload = {
                email: email,
                username : username,
                role: role,
            }

            const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn : "3h" })

            const result = {
                msg : "Token created",
                token : token,
                username: username,
                role : role,
            }
            logger.info("Created Token Success")
            return result

        } catch (error) {
            throw error
        }
    }
    login = async (req, res) =>{
        try {
        const userDB = await model.getByEmail(req.body.email)
        const passUser = req.body.password
            
         if (userDB.length <= 0) {
            logger.error("Email not registered")
            return response(res, 200, {msg: "Email not registered"})
        }
        
        const check = await bcr.compare(passUser, userDB[0].password)

        if (check) { 
            const result = await this.setToken(req.body.email, userDB[0].username, userDB[0].role)
            return response(res, 200, result)
        } 
            logger.error("Check Password")
            return response(res, 200, {msg: "Check Password"})

        } catch (error) {
            logger.error(error)
            return response(res, 500, error)

        }
    }
}

module.exports = new Auth()