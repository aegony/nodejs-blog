const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

// create a data as object in mongodb
// Post.create({
//   title: 'My second blog post',
//   description: 'Second blog post description',
//   content: 'Second lorem ipsum content.'
// }, (err, post) => {
//   console.log(err, post)
// })


// finding data in mongodb, specify post with title 'My first blog post'
// Post.find({
//   title: 'My first blog post'
// }, (error, posts) => {
//   console.log(error, posts)
// })

// find all posts
Post.find({}, (error, posts) => {
  console.log(error, posts)
})


// find post by ID
// Post.findById('5ff3311aa8d3c0a1d91e10ab', (error, post) => {
//   console.log(error, post)
// })


// update post title by ID
// Post.findByIdAndUpdate('5ff3311aa8d3c0a1d91e10ab', {
//   title: 'My first blog post title lorem ipsum'
// }, (error, post) => {
//   console.log(error, post)
// })