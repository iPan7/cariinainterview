const requireLogin = require('../middlewares/requireLogin');
const Form = require('../models/Form');

module.exports = {
    saveForm: (requireLogin, async (req,res) => {
        // questions object from FormMaker post request
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
        // ^ find all forms with a specific user id and then return all the forms. This is why you can't see the forms from other users.
    }),
    deleteForm: (requireLogin, async (req, res) => {
        const { id } = req.params;
        Form.findByIdAndRemove(id).then(form => res.json(form))
    }),
    getFormById: (async (req, res) => {
        const {id} = req.params;
        Form.findOne({_id: id}).then((form => res.json(form)))
    }),
    editForm: (requireLogin, async (req, res) => {
        const {id} = req.params;
        let form;
        if (req.body.questions) {
            form = await Form.findByIdAndUpdate(id, {questions: JSON.parse(req.body.questions)});
        }
        if (req.body.private === true || req.body.private === false) {
            form = await Form.findByIdAndUpdate(id, {private: req.body.private});
        }
        form.save();
        res.json(form)
    })
}