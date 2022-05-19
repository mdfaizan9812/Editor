"use strict"

const bcrypt = require('bcrypt');

module.exports.bcryptPassword = async (plainPassword) => {
    const hashPassword = await bcrypt.hash(plainPassword, 10);
    return hashPassword;
}

module.exports.compareHashPassword = async(plainPassword,hashPassword)=>{
    const match = await bcrypt.compare(plainPassword, hashPassword)
    return match;
}