const Test = require('./Test');

module.exports = (formData) => {
    const form = new Form(formData);
    
    return form.save();
}