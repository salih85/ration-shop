const RationItem = require('../models/RationItem');

exports.addItemPage = (req, res) => {
  res.render('addItem');
};

exports.createItem = async (req, res) => {
  try {
    const { itemName, quantityPerMonth, cardType, price } = req.body;
    await RationItem.create({ itemName, quantityPerMonth, cardType, price });
    res.redirect('/admin/items');
  } catch (e) {
    console.log(e);
  }
};

exports.allItems = async (req, res) => {
  const items = await RationItem.find();
  res.render('items', { items });
};


exports.itemsByCard = async (req, res) => {
  const { type } = req.params;
  const items = await RationItem.find({ cardType: type.toUpperCase() });
  res.render('items', { items });
};
