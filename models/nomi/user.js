const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  email: { type: String, required: true },
  googleProvider: {
    id: { type: String, required: false }
  },
  facebookProvider: {
    id: { type: String, required: false }
  },
  created: { type: Date, required: true },
  history:[]
});

module.exports = mongoose.model('User', userSchema);
