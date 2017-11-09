module.exports = function(req, res, next) {
    res.sendHttpError = function(error) {
        res.status(error.status).json({error: error.message});
    };

    next();
};
