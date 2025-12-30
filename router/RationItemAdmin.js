const express = require('express');
const router = express.Router();
const { addItemPage, createItem, allItems, itemsByCard} = require('../controllers/RationItemAdmin');

router.get('/items', allItems);
router.get('/items/add', addItemPage);
router.post('/items/add', createItem);
router.get('/items/:type', itemsByCard);

module.exports = router;
