const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var mongoEnv = process.env.MONGODB_URI || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/TodoApp';
mongoose.connect(mongoEnv);
console.log(mongoEnv);
module.exports = {
    mongoose
};