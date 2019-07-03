const express = require('express');
const pug = require('pug');
const path = require('path');

// make express app
const app = express();

//set view engine: pug
app.set('view engine', 'pug');

//set static file server
app.use('/static', express.static(path.join(__dirname,'public')));

//routers
const mainRoute =require('./routes/mainRoute');
const projectRoute = require('./routes/projectRoute');
app.use(mainRoute);
app.use(projectRoute);

//error for 404
app.use((req,res,next)=>{
  const error = new Error("Not found")
  error.status = 404;
  next(error);
})

//erorr handler
app.use((err,req,res,next)=>{
  const templateData ={
    message: err.message,
    statusCode: err.status,
    stack:err.stack,
    imgUrl: "/static/images/anonymous.svg"
  }
  console.log(err.message);
  res.render('error', templateData);
});

//create server on port 3000
const port = process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`listening on port ${port}.`);
});
