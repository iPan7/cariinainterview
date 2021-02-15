const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const formTemplate = require('../services/emailTemplates/formTemplate');

const Form = mongoose.model('forms');

module.exports = app => {
    app.post('/api/forms', requireLogin, (req,res) => {
        const { title, subject, body, recipients} = req.body;

        const form = new Form({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })), 
            _user: req.user.id
        });

        // Code to send out an email using the mailer
        const mailer = new Mailer(form, formTemplate(form));
        mailer.send();
    });
};