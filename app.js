const express = require('express');
const pug = require('pug');
const path = require('path');
const {projects} = require('./data.json');

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
  res.render('index', {projects});
});

app.get('/about',(req,res)=>{
  res.render('about');
});

app.get('/project:id',(req,res)=>{
  const id = req.params.id.slice(1);
  const project = projects[id];
  const templateData ={
    title: project.project_name,
    description: project.description,
    technology: project.technology,
    liveLink: project.live_link,
    githubLink: project.github_link,
    projectImages: project.img_urls.slice(1)
  }
  res.render('project', templateData);
});

app.use((req,res,next)=>{
  const error = new Error("Not found")
  error.status = 404;
  next(error);
})

app.use((err,req,res,next)=>{
  const templateData ={
    message: err.message,
    imgUrl: "/static/images/anonymous.svg"
  }
  console.log(err.message);
  console.log(templateData.imgUrl)
  res.render('error', templateData);

});

app.listen(3000,()=>{
  console.log('listening on port 3000.');
});
