import Post from "../models/postModel.js"


const allPosts = async (req, res, next) => {

    try {

        const post = await Post.find()
        res.status(200).json({ data: post })

    } catch (error) {
        res.status(500)
        throw new Error("Internal Error, Please try again later!")
    }


}

const uploadPost = async (req, res, next) => {

    const { name, url } = req.body

    try {

        const post = await Post.create({ name, url })
        res.status(200).json({ data: post })

    } catch (error) {
        res.status(500)
        throw new Error("Internal Error, Please try again later!")
    }


}

const deletePost = async (req, res, next) => {

    const id = req.body.id.trim()

    try {
        const post = await Post.findByIdAndDelete(id)
        console.log(post);
        res.status(200).json({ message: "Successfully Deleted" })

    } catch (error) {
        console.log(error);
        res.status(500)
        throw new Error("Internal Error, Please try again later!")
    }

}

export { uploadPost, deletePost, allPosts }