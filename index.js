const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {post} = require('./model/postModel')
require('dotenv').config();
log = console.log
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoURI);
}

app.post('/', async (req, res) => {
    const data = req.body
    var title = data.title
    var content = data.content
    var thepost = new post({title, content})
    await thepost.save();
    console.log(thepost)
    res.send(`Post created with the title: ${title} & ID: ${thepost._id} `)
    // res.send(data)
})

app.get('/', async (req, res) => {
    const data = await  post.find({})
    res.send(data);
})

app.get('/:id', async (req, res) => {
  const postID = req.params.id;
  const data = await post.findOne({_id: postID})
  res.send(data)
})

app.delete('/', async (req, res) => {
    const data = req.body;
    const id = data.id
    const exists = await post.findOne({_id: id})
    // console.log(exists)
    // res.send(exists)
    if (exists._id == id) {
      res.send("A blog is found")
      const del = await post.deleteOne({_id:id})
    } else {
      res.send(`Blog with ID: ${id} not found!`)
    }
})

app.listen(port, () => console.log(`Running on port ${port}`))