const { getForms, saveForm, deleteForm, getFormById, editForm } = require('../controllers/formController')

module.exports = app => {
    app.get('/api/forms', getForms);
    // create a new form
    app.post('/api/forms', saveForm);
    app.delete('/api/forms/:id', deleteForm)
    app.get('/api/forms/:id', getFormById)
    app.patch('/api/forms/:id', editForm)
};