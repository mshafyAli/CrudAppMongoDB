


import express from 'express';
import { client } from '../../mongoDb.mjs';
import { ObjectId } from 'mongodb';

const db = client.db('cruddb');
const col = db.collection("posts");


let router = express.Router()


let posts = [
  {
    title: "abc post title",
    text: "some post text"
  }
]

// POST    /api/v1/post
router.post('/post', async (req, res, next) => {
  console.log('this is signup!', new Date());

  if (
    !req.body.title
    || !req.body.text
  ) {
    res.status(403);
    res.send(`required parameters missing, 
        example request body:
        {
            title: "abc post title",
            text: "some post text"
        } `);
    return;
  }
                                                                                                                                                              
  try {
    const insertResponse = await col.insertOne({
      title: req.body.title,
      text: req.body.text,
      createdOn: new Date()

    });
    console.log("InsertRespone :", insertResponse);

    res.send('post created of apivi');
  } catch (e) {
    console.log("error in inserting mongoDb", e)
    res.status
      (500).send('server error, please try later ')
  }
})
// GET     /api/v1/posts
router.get('/posts', async (req, res, next) => {

  const cursor = col.find({});

  try {

    let results = await cursor.toArray()
    console.log('results:', results);
    res.send(results);
  } catch (e) {
    console.log("error getting data mongodb", e);
    res.status(500).send('server error please try later');
  }
})

// GET     /api/v1/post/:postId
router.get('/post/:postId', async (req, res, next) => {
  console.log('this is signup!', new Date());

  if (!ObjectId.isValid(req.params.postId)) {
    res.status(403).send('invalid Post ID')
    return;
  }

  try {

    let result = await col.findOne({ _id: new ObjectId(req.params.postId)});
    console.log('results:', result);
    res.send(result);
  } catch (e) {
    console.log("error getting data mongodb", e);
    res.status(500).send('server error please try later');
  }



  res.send('post not found with id ' + req.params.postId);
})

// PUT     /api/v1/post/:userId/:postId
router.put('/post/:postId', (req, res, next) => {

  if (!req.params.title || req.params.text) {
    res.status(404).send(`example put body: {
      put /api/v1/post/:postId
      {
        title: "updated title",
        text: "updated text"
      }
    }`)
  }

});
// DELETE  /api/v1/post/:userId/:postId
router.delete('/post/:postId', (req, res, next) => {

  if(!req.params.postId){
    res.status(404).send("post id must be a valid id")
  }


  for (let i; i < posts.length; i++) {
    if (posts[i].id === req.params.postId) {
      posts.splice(i,1);
      res.send("Post updated with Id" + req.params.postId)
      return;
    }
    res.send("post not found with id" + req.params.postId)
  }

});

export default router