import { Router } from "express";
import upload from "../utils/m";
import { createPost, getPost, getPosts, getCatPosts, getUserPosts, deletePost, editPost, getCategories, getPopularCategories } from "../contorllers/postController";
import authMiddleware from "../middleware/authMiddlware";

const router = Router()

router.route('/').get(getPosts).post(authMiddleware, upload.single('thumbnail'), createPost)
router.get('/categories', getCategories)
router.get('/popular-categories', getPopularCategories)
router.route('/:id').get(getPost).patch(authMiddleware, upload.single('thumbnail'), editPost).delete(authMiddleware, deletePost)
router.get('/categories/:id', getCatPosts)
router.get('/users/:id', getUserPosts)
export default router