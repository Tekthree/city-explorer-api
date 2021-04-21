'use strict'
const express = require('express');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', (res,req)=>{
  res.send('is this working');
})


app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));