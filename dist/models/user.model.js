const userGoose = require('mongoose');
const Schema = userGoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 7
    },
    firstname: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    lastname: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    role: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        minlength: 5
    }
}, { timestamps: true });
const User = userGoose.model('User', userSchema);
module.exports = User;
//# sourceMappingURL=user.model.js.map