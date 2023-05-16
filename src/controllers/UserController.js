import UserRepository from "../repositories/UserRepository.js";

class UserController {
    async create(req, res) {
        try {
            const user = await UserRepository.create(req.body); 
            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const users = await UserRepository.getAll();
            return res.status(200).json(users)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async getOne(req, res) {
        try {
            const user = await UserRepository.getOne(req.params.id);
            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            const updatedUser = await UserRepository.update(req.body) 
            return res.status(200).json(updatedUser)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const deletedUser = await UserRepository.delete(req.params.id) 
            return res.status(200).json(deletedUser)
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

export default new UserController();
