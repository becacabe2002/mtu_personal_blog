const express = require('express');
const { now, result } = require('lodash');
const morgan = require('morgan'); // middleware
const mongoose = require('mongoose'); // ODM

const blogRoutes = require('./routes/blogRoutes'); //router

const dbUri = 'mongodb+srv://mtu:29123498@Blogs.g8ao3ro.mongodb.net/mtu-blogs?retryWrites=true&w=majority';

// create instance of express
const app = express();

mongoose.connect(dbUri).
then((result) => {
    console.log('connected to mongodb.');
    app.listen(3000);
})
.catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');
// app.set('views', __dirname + '/path/to/viewsDirect ')

// static is not default set to be accessed
// use middle to public static file.
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));// attach to req body
// app.use((req, res, next)=>{
//     console.log('new rq made.');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     next();
// });
// -> use 3rd party middleware

app.use(morgan('dev'));

app.get('/', (req, res) => {
    // const blogs = [
    //     {title: 'Blog1', snippet: 'Blaskalsdjkfaskdfjalskdjf'},
    //     {title: 'Blog2', snippet: 'Blaskalsdjkfaskdfjalskdjf'},
    //     {title: 'Blog3', snippet: 'Blaskalsdjkfaskdfjalskdjf'}
    // ];
    // // res.sendFile('./views/index.html', { root: __dirname});
    // res.render('index', {title: 'Home', blogs}); // render the ejs file (server-side rendering)
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html', { root: __dirname});
    res.render('about', {title: 'About'});
});

// use dedicated router
app.use('/blogs',blogRoutes); // specify the route

// middleware to filter request
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});