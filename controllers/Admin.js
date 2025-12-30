const Ration = require('../models/Ration');
const FamilyMember = require('../models/FamilyMember');
const RationItem = require('../models/RationItem');
const PurchaseHistory = require('../models/PurchaseHistory');

exports.adminUsers = async (req, res) => {
  try {
    const users = await Ration.find().sort({ createdAt: -1 });
    return res.render('users', { users });
  } catch (e) {
    console.error(e);
    return res.redirect('/admin');
  }
};

exports.addUserPage = (req, res) => {
  res.render('addUser');
};

exports.createuser = async (req, res) => {
  try {
    const {
      headName,
      cardNumber,
      cardType,
      houseNumber,
      ward,
      panchayat,
      district,
      gender,
      mobile
    } = req.body;

    await Ration.create({
      headName,
      cardNumber,
      cardType,
      houseNumber,
      ward,
      panchayat,
      district,
      gender,
      mobile
    });

    return res.redirect('/admin');
  } catch (e) {
    console.log(e);
  }
};


exports.familyPage = async (req, res) => {
  const ration = await Ration.findById(req.params.id);
  const members = await FamilyMember.find({ rationId: req.params.id });

  res.render('family', { ration, members });
};

exports.addFamilyMember = async (req, res) => {
  const { name, age, gender, relation } = req.body;

  await FamilyMember.create({
    rationId: req.params.id,
    name,
    age,
    gender: gender.toLowerCase(),
    relation
  });

  res.redirect(`/admin/family/${req.params.id}`);
};
exports.entitlementsPage = async (req, res) => {
  try {
    const user = await Ration.findById(req.params.id);
    const members = await FamilyMember.find({ rationId: user._id });
    const items = await RationItem.find({ cardType: user.cardType });
  
    const purchaseHistory = await PurchaseHistory.find({ rationId: user._id });
    const purchasedItemNames = new Set(purchaseHistory.map(p => p.itemName));

    const itemsWithTotal = items.map(item => {
      const quantityStr = item.quantityPerMonth;
      const quantityNum = parseFloat(quantityStr) || 1;
      const totalPrice = quantityNum * item.price;
      const isPurchased = purchasedItemNames.has(item.itemName);

      return {
        _id: item._id,
        itemName: item.itemName,
        quantityPerMonth: quantityStr,  
        price: item.price,
        totalPrice,
        isPurchased
      };
    });

    res.render('entitlements', {
      user,
      members,
      items: itemsWithTotal
    });

  } catch (err) {
    console.error(err);
    res.redirect('/admin');
  }
};

exports.purchaseItems = async (req, res) => {
  try {
    const { userId, itemName } = req.params;
  
    if (itemName === 'all') {
      const user = await Ration.findById(userId);
      const allItems = await RationItem.find({ cardType: user.cardType });
      for (const item of allItems) {
        const existingPurchase = await PurchaseHistory.findOne({
          rationId: userId,
          itemName: item.itemName
        });
        
        if (!existingPurchase) {
          await PurchaseHistory.create({
            rationId: userId,
            itemName: item.itemName,
            price: item.price
          });
        }
      }
      
      return res.redirect(`/admin/entitlements/${userId}`);
    }
    
    const existingPurchase = await PurchaseHistory.findOne({
      rationId: userId,
      itemName
    });

    if (!existingPurchase) {
      const item = await RationItem.findOne({ itemName });
      
      if (item) {
        await PurchaseHistory.create({
          rationId: userId,
          itemName,
          price: item.price
        });
      }
    }

    res.redirect(`/admin/entitlements/${userId}`);
  } catch (err) {
    console.error(err);
    res.redirect('/admin');
  }
};

exports.resetPurchases = async (req, res) => {
  try {
    const { userId } = req.params;
    await PurchaseHistory.deleteMany({ rationId: userId });
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.redirect('/admin');
  }
};

exports.adminDashboard = async (req, res) => {
  try {
    const totalUsers = await Ration.countDocuments();
    const totalItems = await RationItem.countDocuments();
    const totalPurchases = await PurchaseHistory.countDocuments();

    const revenueAgg = await PurchaseHistory.aggregate([
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    const totalRevenue = revenueAgg && revenueAgg[0] ? revenueAgg[0].total : 0;

    const recentUsers = await Ration.find().sort({ createdAt: -1 }).limit(10);

    return res.render('admin/home', {
      totalUsers,
      totalItems,
      totalPurchases,
      totalRevenue,
      recentUsers
    });
  } catch (e) {
    console.error(e);
    return res.redirect('/admin');
  }
};
