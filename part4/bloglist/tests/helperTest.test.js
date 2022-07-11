const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})


describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]
    // test.only() for debugging issue
    // "-t" to determine which test to run.  usage: npm test -- -t '....'
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(15)
    })
})

describe('Favorite blog', () => {
    const listWithTwoBlog = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 10
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
    ]
    test('two blogs 5, 10 expeted 10', () => {
        const result = listHelper.favoriteBlog(listWithTwoBlog)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })
})

describe('Most Blogs', () => {
    const listWithTwoBlog = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 10
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Nothing",
            author: "Douglas",
            likes: 30
        },
        {
            title: "Nothing",
            author: "Douglas",
            likes: 30
        },
        {
            title: "Nothing",
            author: "Douglas",
            likes: 30
        }
    ]

    test('two author tests', () =>{
        const result = listHelper.mostBlogs(listWithTwoBlog);
        expect(result).toEqual(
            {
                author:"Douglas",
                blogs:3
            }
        )
    })

    test('empty list most blogs', () =>{
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })

    test('two author most likes', () => {
        const result = listHelper.mostLikes(listWithTwoBlog)
        expect(result).toEqual(
            {
                author:"Douglas",
                likes:90
            }
        )
    })

})