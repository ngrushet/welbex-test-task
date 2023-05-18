import { validationResult } from "express-validator";
import PostRepository from "../repositories/PostRepository.js";

class PostController {
    async create(req, res) {
        try {
            const post = await PostRepository.create({
                message:    req.body.message,
                media:      req.body.media,
                authorId:   req.userId,
            }); 
            return res.status(200).json(post)
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: "Failed to create new post"
            })
        }
    }

    async getAll(req, res) {
        try {
            const posts = await PostRepository.getAll();
            return res.status(200).json(posts)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async getOne(req, res) {
        try {
            const post = await PostRepository.getOne(req.params.id);
            return res.status(200).json(post)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await PostRepository.update(req.params.id, req.body) 
            return res.status(200).json(updatedPost)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const deletedPost = await PostRepository.delete(req.params.id) 
            return res.status(200).json(deletedPost)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

export default new PostController();
