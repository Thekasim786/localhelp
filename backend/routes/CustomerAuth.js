
const express = require("express");
const { CustomersignupValidation , CustomerLoginValidation } = require("../middlewares/CustomerAuthValidation");
const { Customersignup , CustomerLogin} = require("../Controllers/CustomerAuthControllers");
const router = express.Router();
router.post('/customer-login',CustomerLoginValidation,CustomerLogin);

router.post('/customer-signup',CustomersignupValidation,Customersignup);

module.exports = router;



