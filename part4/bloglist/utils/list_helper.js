const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    const sum = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
    return sum;
}

const favoriteBlog = (blogs) => {
    let curr = blogs[0]
    blogs.forEach((blog) => {
        if (blog.likes > curr.likes) {
            curr = blog
        }
    })
    return curr
}

const mostBlogs = (blogs) => {
    let authorBlogs = {}
    
    blogs.forEach(blog => {
        if (authorBlogs[blog.author]){
            authorBlogs[blog.author] += 1
        } else {
            authorBlogs[blog.author] = 1
        }
    })
    const authorsKeys = Object.keys(authorBlogs);
    let currMaximum = 0;
    let currAuthor = '';

    for (i = 0; i < authorsKeys.length; i++){
        if (currMaximum < authorBlogs[authorsKeys[i]]){
            currMaximum = authorBlogs[authorsKeys[i]]
            currAuthor = authorsKeys[i]
        }
    }
    
    return currAuthor? 
        {
            author: currAuthor,
            blogs: currMaximum
        }
        :
        {}
}

const mostLikes = blogs => {
    let authorLikes = {}
    blogs.forEach(blog => {
        if (authorLikes[blog.author]){
            authorLikes[blog.author] += blog.likes
        } else {
            authorLikes[blog.author] = blog.likes
        }
    })
    const authorKeys = Object.keys(authorLikes)

    let currMaximum = 0;
    let currAuthor = '';

    for (i = 0; i < authorKeys.length; i++){
        if (currMaximum < authorLikes[authorKeys[i]]){
            currMaximum = authorLikes[authorKeys[i]]
            currAuthor = authorKeys[i]
        }
    }
    return currAuthor ?
            {
                author: currAuthor,
                likes: currMaximum
            }
            :
            {}
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}