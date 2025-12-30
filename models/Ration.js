const mongoose = require('mongoose');

const RationSchema = new mongoose.Schema({
  headName: String,
  cardNumber: String,
  cardType: { type: String, enum: ['APL','BPL','AAY','PHH'] },
  houseNumber: String,
  ward: String,
  panchayat: String,
  district: String,
  gender: String,
  mobile: String
}, { timestamps: true });

module.exports = mongoose.model('Ration', RationSchema);
