const bcrypt = require("bcrypt"); //encirptar contraseña
const saltRounds = 10

const encrypt = async(passwordPlain) => {
    return await bcrypt.hash(passwordPlain, saltRounds)
};

const compare = async(passwordPlain, hashedPassword) => {
    return await bcrypt.compare(passwordPlain, hashedPassword)
}

module.exports = { encrypt, compare }