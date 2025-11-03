const Joi = require("joi");
const CustomersignupValidation = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(30).required(),
        lastName: Joi.string().min(2).max(30).required(),
        email: Joi.string().email().required(), 
        phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
        address: Joi.string().min(2).max(100).required(),
        password: Joi.string().min(6).required(),
        
       
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Bad Request",error 
        });
    }
    next();

}
const CustomerLoginValidation = (req, res, next) => {
    const schema = Joi.object({
        
        email: Joi.string().email().required(), 
        password: Joi.string().min(6).required(),
    });const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Bad Request",error 
        });
    }
    next();

}
module.exports = {CustomersignupValidation,CustomerLoginValidation};