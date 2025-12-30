const mongoose = require('mongoose');

const PurchaseHistorySchema = new mongoose.Schema({
  rationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ration',
    required: true
  },

  itemName: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  purchasedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PurchaseHistory', PurchaseHistorySchema);
