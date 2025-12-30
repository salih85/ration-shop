const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
  rationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ration', required: true },
  name: String,
  age: Number,
  gender: { type: String, enum: ['male','female','other'] },
  relation: String
}, { timestamps: true });

module.exports = mongoose.model('FamilyMember', FamilyMemberSchema);
