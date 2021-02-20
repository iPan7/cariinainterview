const Test = require('./Test');

module.exports = (_id) => {
    return Test.findById(_id);
}