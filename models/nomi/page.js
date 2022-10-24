const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
  id: { type: Number, required: true },
  type: { type: Number, required: true },
  img:{ type: String, required: true },
  next:{ type: Number, required: false }
});

module.exports = mongoose.model('Page', pageSchema);
