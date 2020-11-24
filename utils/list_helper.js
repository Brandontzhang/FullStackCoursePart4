const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sumLikes, blog) => sumLikes + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    let favBlog = blogs[0]
    blogs.map(blog => {
        if (blog.likes > favBlog.likes) {
            favBlog = blog
        }
    })
    return favBlog
}

const mostBlogs = (blogs) => {

}

const mostLikes = (blogs) => {

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}