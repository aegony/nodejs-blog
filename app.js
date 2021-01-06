const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const { config, engine } = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const Post = require('./database/models/Post')

// mongoDB connection
mongoose.connect('mongodb://localhost/node-js-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

config({ cache: process.env.NODE_ENV === 'production' })

// setup folder for static files as /css, /js, /pics
app.use(express.static('public'))

app.use(engine)
app.set('views', `${__dirname}/views`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const validateCreatePostMiddleware = (req, res, next) => {
  if (!req.file.image || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content) {
    console.log()
    // return res.redirect('/post/new')
  }
  next()
}

app.use('/posts/store', validateCreatePostMiddleware)

app.use(fileUpload())

app.get('/', async (req, res) => {
  const posts = await Post.find({})
  console.log(posts)
  res.render('index', {
    posts
  })
})

app.get('/post/new', (req, res) => {
  res.render('create')
})

app.post('/posts/store', (req, res) => {
  const { image } = req.files
  image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
    // create post and redirecto to home page
    Post.create({
      ...req.body,
      image: `/posts/${image.name}`
    }, (error, post) => {
      res.redirect('/')
    })
  })
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.render('post', {
    post
  })
})

app.get('/contact', (req, res) => {
  res.render('contact')
})


app.listen(4000, () => {

  console.log('app listening on port 4000')

})