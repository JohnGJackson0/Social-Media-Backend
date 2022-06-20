import { model, Schema } from "mongoose";
import { User } from "../types/models";

const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema<User>({
  firstName: {
    type: String,
    trim: true,
    required: true,
    max: 32,
  },
  lastName: {
    type: String,
    trim: true,
    required: false,
    max: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
})

// NOTE: Pre & Post save hooks are not executed on update

userSchema.pre('save', function(next) {
  var user = this;

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export const UserModel = model<User>('User', userSchema);
