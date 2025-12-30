const express = require('express');
const router = express.Router();
const {adminDashboard, adminUsers, addUserPage,createuser,  familyPage,addFamilyMember,entitlementsPage,purchaseItems,resetPurchases} = require('../controllers/Admin');

router.get('/', adminDashboard);
router.get('/users', adminUsers);
router.get('/add-user', addUserPage);
router.post('/add-user', createuser);
router.get('/items', (req, res) => res.render('admin/items'));
router.get('/items/APL', (req, res) => res.render('admin/items'));
router.get('/items/BPL', (req, res) => res.render('admin/items'));
router.get('/items/AAY', (req, res) => res.render('admin/items'));
router.get('/items/PHH', (req, res) => res.render('admin/items'));
router.get('/items/add', (req, res) => res.render('admin/items'));

router.get('/family/:id', familyPage);
router.post('/family/:id', addFamilyMember);

router.get('/entitlements/:id', entitlementsPage);
router.post('/purchase/:userId/:itemName', purchaseItems);
router.post('/reset-purchases/:userId', resetPurchases);

module.exports = router;
