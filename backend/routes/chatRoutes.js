const express = require("express");
const { accessChat, fetchChats, createGorupChats, renameGroup, addToGroup, removeFromGroup } = require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route('/').post(protect,accessChat);
router.route('/').get(protect,fetchChats);
router.route('/group').post(protect,createGorupChats);
router.route('/rename').put(protect,renameGroup);
router.route('/addGroup').put(protect,addToGroup);
router.route('/removeGroup').put(protect,removeFromGroup);


module.exports = router;