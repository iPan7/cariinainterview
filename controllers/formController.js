const requireLogin = require('../middlewares/requireLogin');
const Form = require('../models/Form');

module.exports = (_id) => {
    return Test.findById(_id);
}
module.exports = {
    saveForm: (requireLogin, async (req,res) => {
        const { questions } = req.body;
        const form = await new Form({
            questions: JSON.parse(questions),
            _user: req.user.id
        });
        console.log(form)
        form.save();
        res.json(form)
    }),
    getForms: (requireLogin, async (req, res) => {
        Form.find({_user: req.user.id}).then(forms => res.json(forms))
    }),
    deleteForm: (requireLogin, async (req, res) => {
        const { id } = req.params;
        Form.findByIdAndRemove(id).then(form => res.json(form))
    })
}