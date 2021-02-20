const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    
    // create a new survey
    app.post('/api/surveys', requireLogin, (req,res) => {
        const { title, subject, body, recipients} = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })), 
            _user: req.user.id
        });

        // Code to send out an email using the mailer
        const mailer = new Mailer(survey, surveyTemplate(survey));
        mailer.send();
    });
};