import PostRepository from "../../repositories/PostRepository.js"

export const checkAuthor = async (req, res, next) => {
    try {
        const {authorId} = await PostRepository.getOne(req.params.id)
    
        if (Number(req.userId) !== Number(authorId)) {
            return res.status(403).json({
                message: "You have not necessairy permissions for this action at this post"
            })
        }
        next();
    } catch (e) {
        return res.status(500).json({
            message: "Internal server error"
        })
    } 
}