const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },

    password: {
        type: String,
        require: true
    },

    role: {
        type: String,
        enum: ["ADMIN", "SUPERADMIN", "USER"],
        default: "USER"
    },

}, {
    timestamps: true
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;