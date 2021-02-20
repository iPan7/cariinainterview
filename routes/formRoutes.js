const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Form = require('../models/Form');

module.exports = app => {
    
    // create a new form
    app.post('/api/forms', requireLogin, async (req,res) => {
        const { questions } = req.body;
        const form = await new Form({
            questions: JSON.parse(questions),
            _user: req.user.id
        });
        console.log(form)
        form.save();
        res.json(form)
    });
};