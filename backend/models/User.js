const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    // Not strictly required anymore due to phone auth
    sparse: true
  },
  password: {
    type: String,
    // Not required for OAuth/Phone
  },
  phone: {
    type: String,
    sparse: true
  },
  googleId: {
    type: String,
    sparse: true
  },
  authProvider: {
    type: String,
    enum: ['local', 'google', 'phone'],
    default: 'local'
  },
  photo: {
    type: String,
    default: ''
  },
  college: {
    type: String,
    default: ''
  },
  semester: {
    type: String,
    default: ''
  },
  branch: {
    type: String,
    default: ''
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
