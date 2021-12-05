module.exports = (app) => {
    app.use('/API', require('./routes/login'));
    app.use('/API', require('./routes/changepwd'));
    app.use('/API', require('./routes/signup'));
    app.use('/API', require('./routes/sendotp'));
    app.use('/API', require('./routes/menu'));
};