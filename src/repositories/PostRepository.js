import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({})

class PostService {
    async create(post){
        try {
            const newPost = await prisma.post.create({
                data: post
            });
            return newPost;
        } catch (e) {
            console.error(e);
        }
    }

    async getAll() {
        try {
            const posts = await prisma.post.findMany();
            return posts;
        } catch (e) {
            console.error(e);
        }
    }

    async getOne(id) {
        if (!id) {
            throw new Error('id not passed')
        }
        const post = await prisma.post.findFirstOrThrow({
            where: {
                id: Number(id)
            }
        });
        return post;        
    }

    async update(id, post) {
        try {
            if (!id) {
                throw new Error('id not passed')
            } 
            const updatedPost = await prisma.post.update({
                where: {
                    id: Number(id)
                },
                data: post
            })
            return updatedPost
        } catch (e) {
            console.error(e)
            throw new Error("Can't update this post");
        }
         
    }

    async delete(id) {
        try {
            if (!id) {
                throw new Error("id not passed");
            } 
            const deletedPost = await prisma.post.delete({
                where: {
                    id: Number(id)
                }
            })
            return deletedPost
        } catch (e) {
            console.error(e)
            throw new Error("Can't delete this post");
        }
    }
}

export default new PostService();