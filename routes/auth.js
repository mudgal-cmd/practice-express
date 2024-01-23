const express = require('express');

const app = express();

const router = express.Router();

router.get('/login', (req, res)=>{
  res.send('User is authorized');
});

module.exports = router;