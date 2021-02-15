const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/forms', requireLogin, (req,res) => {});
};