

import express from 'express'
let router = express.Router()



// GET     /api/v2/post/:userId/:postId

router.get('/api/v2/post/:userId/:postId', (req, res) => {
    console.log('this is profile!', new Date());
    res.send('post created' + new Date());
  })
  
  // GET     /api/v2/posts/:userId 
  router.put('/api/v2/posts/:userId ', (req, res) => {
    console.log('this is profile!', new Date());
    res.send('post created' + new Date());
  })
  
  
  // POST    /api/v2/post
  router.post('/api/v2/post', (req, res) => {
    console.log('this is profile!', new Date());
    res.send('post created' + new Date());
  })
  
  // PUT     /api/v2/post/:userId/:postId
  router.put('/api/v2/post/:userId/:postId', (req, res) => {
    console.log('this is profile!', new Date());
    res.send('post created' + new Date());
  })
  // DELETE  /api/v2/post/:userId/:postId
  router.delete('/api/v2/post/:userId/:postId', (req, res) => {
    console.log('this is profile!', new Date());
    res.send('post created' + new Date());
  })
  

  export default router