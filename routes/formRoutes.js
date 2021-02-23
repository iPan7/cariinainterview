const { getForms, saveForm, deleteForm } = require('../controllers/formController')

module.exports = app => {
    app.get('/api/forms', getForms);
    // create a new form
    app.post('/api/forms', saveForm);
    app.delete('/api/forms/:id', deleteForm)

};