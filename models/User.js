//const mongoose = require('mongoose');
const bookshelf = require('../bookshelf');

const User = bookshelf.model("User", {
    tableName: "users",
    hasTimestamps: true
});

// const UserSchema = new mongoose.Schema({
//     googleID: {
//         type: String,
//         required: true
//     },
//     displayName: {
//         type: String,
//         required: true
//     },
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('User', UserSchema);
module.exports = User;