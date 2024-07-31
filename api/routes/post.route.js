import express from 'express';
import { create, deletepost, getposts, getPostsByUser, updatepost } from '../controllers/post.controller.js';
import { verifyToken, verifyRoles } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, verifyRoles('isAdmin', 'isEmployed'), create)
router.get('/getposts', getposts)
router.get('/user/:userId', verifyToken, getPostsByUser);
router.delete('/deletepost/:postId/:userId', verifyToken, verifyRoles('isAdmin', 'isEmployed'), deletepost)
router.put('/updatepost/:postId/:userId', verifyToken, verifyRoles('isAdmin', 'isEmployed'), updatepost)

export default router; 