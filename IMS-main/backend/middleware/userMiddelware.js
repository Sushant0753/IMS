const { User } = require('../db');

function userMiddleware(req, res, next) {
    const { email, password } = req.body;

    User.findOne({ email, password })
        .then(user => {
            if (user) {
                next();
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Internal server error" });
        });
}

module.exports = userMiddleware;
