const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const {
    Schema
} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    labelsCreated: [{
        type: Schema.Types.ObjectId,
        ref: "Label",
    }],
});

userSchema.pre("save", function(next) {
    const user = this;
    const now = new Date();

    user.updatedAt = now;
    if (!user.createdAt) {
        user.createdAt = now;
    }

    if (user.isModified("password")) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);

                user.password = hash;
                return next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        return done(err, isMatch);
    })
}

module.exports = mongoose.model('User', userSchema)
