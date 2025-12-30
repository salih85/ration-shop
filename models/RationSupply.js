const mongoose = require('mongoose');

const RationSupplySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  unit: { type: String, required: true }, 
  entitlements: {
    APL: { type: Number, default: 0 },
    BPL: { type: Number, default: 0 },
    AAY: { type: Number, default: 0 },
    PHH: { type: Number, default: 0 }
  },
  price: {
    APL: { type: Number, default: 0 },
    BPL: { type: Number, default: 0 },
    AAY: { type: Number, default: 0 },
    PHH: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('RationSupply', RationSupplySchema);
