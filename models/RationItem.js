const mongoose = require('mongoose');

const RationItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },

  quantityPerMonth: {
    type: String, 
    required: true
  },

  cardType: {
    type: String,
    enum: ['APL', 'BPL', 'AAY', 'PHH'],
    required: true
  },

  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('RationItem', RationItemSchema);
