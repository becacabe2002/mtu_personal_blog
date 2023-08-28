const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController');

router.get('/', blogController.getBlogIndex);

router.post('/', blogController.postNewBlog);

router.get('/create', blogController.getBlogCreate);

router.get('/:id', blogController.getBlogDetails);

router.delete('/:id', blogController.deleteBlog);

module.exports = router;