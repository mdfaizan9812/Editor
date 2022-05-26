const rateLimit = require('express-rate-limit');


const limiter = rateLimit({
	windowMs: 10000,
    message: "You have failed to login, try again later",
	max: 3,
});

module.exports = { limiter };