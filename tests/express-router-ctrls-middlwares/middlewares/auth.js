const validateUser = async (req, res, next) => {
    if (req.body.name === "moshe" && req.body.password === 1234) {
        next();
    } else {
        next("User not found");
    }
}

export { 
    validateUser
}