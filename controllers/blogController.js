/*
Needed functions:
- getBlogIndex: return index page for blogs
- getBlogDetails: return detail of a blog with _id @param
- getBlogCreate: return create blog page
- postNewBlog: save new blog to db
- deleteBlog: delete blog with _id @param 
*/
const Blog = require('../models/blog');

const getBlogIndex = (req, res) => {
    Blog.find().sort({createdAt: 'desc'})
    .then((result) => {
        // must pass blogs to index view
        res.render('./blogs/index', {title: 'All My Blogs', blogs: result})
    }).catch((err) => console.log(err));
};

const getBlogDetails = (req, res) => {
    const id = req.params.id;// get the url param
    Blog.findById(id).then((result) =>{
        res.render('./blogs/blog-details', {blog: result, title: 'Blog Details'});
    }).catch((err) =>{
        res.status(404).render('404', {title: '404'});
    });
};

const getBlogCreate = (req, res) => {
    res.render('./blogs/create-blog', {title: 'Create a new blog'});
};

const postNewBlog = (req, res) => {
    const newBlog = new Blog(req.body);
    newBlog.save().then((result)=>{
        res.redirect('/blogs');
    }).catch((err)=> console.log(err));
};
const deleteBlog = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id).then(result =>{
        res.json({redirect: '/blogs'});
    }).catch(err => console.log(err));
};

module.exports = {
    getBlogIndex,
    getBlogDetails,
    getBlogCreate,
    postNewBlog,
    deleteBlog
}