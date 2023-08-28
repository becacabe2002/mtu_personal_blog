const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema( // define structure
    {
        title: {
            type: String,
            required: true
        },
        snippet:{
            type: String,
            required: true
        },
        body:{
            type: String,
            required: true
        }
    },{
        timestamps: true // auto generate timestamp
    }
);

const Blog = mongoose.model('Blog', blogSchema) // look for blog collection automatically

module.exports = Blog;