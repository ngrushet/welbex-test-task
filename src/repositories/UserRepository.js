// import User from "./models/User.js";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({})

class UserService {
    async create(user){
        try {
            const checkUser = await prisma.user.findUnique({
                where: {
                    email: {
                        eq: user
                    }
                }
            });
            if (checkUser) {
                throw new Error('User with passed email already exists');
            }
            const newUser = await prisma.user.create(user);
            return newUser;
        } catch (e) {
            console.error(e);
        }
        
    }

    async getAll() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (e) {
            console.error(e);
        }
    }

    async getOne(id) {
        if (!id) {
            throw new Error('id not passed')
        }
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: id
            }
        });
        return user;
    }

    async update(user) {
        if (!user.id) {
            throw new Error('id not passed')
        } 
        const updatedUser = await prisma.user.findByIdAndUpdate(user.id, user, {new: true}) 
        return updatedUser
    }

    async delete(id) {
        if (!id) {
            throw new Error("id not passed");
        } 
        const deletedUser = await prisma.user.findByIdAndDelete(id) 
        return deletedUser
    }
}

export default new UserService();