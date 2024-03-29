"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddlware_1 = __importDefault(require("../middleware/authMiddlware"));
const userControllers_1 = require("../contorllers/userControllers");
const m_1 = __importDefault(require("../utils/m"));
const router = (0, express_1.Router)();
router.post('/register', userControllers_1.registerUser);
router.post('/login', userControllers_1.loginUser);
router.get('/', userControllers_1.getAuthors);
router.get('/profile', authMiddlware_1.default, userControllers_1.getProfile);
router.get('/:id', userControllers_1.getUser);
router.post('/change-avatar', authMiddlware_1.default, m_1.default.single('avatar'), userControllers_1.changeAvatar);
router.patch('/edit-user', authMiddlware_1.default, userControllers_1.editUser);
exports.default = router;
