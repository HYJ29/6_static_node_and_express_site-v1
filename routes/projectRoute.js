const express= require('express');
const router = express.Router();
const {projects} = require('../data.json');

//function for making first letter uppercase
function firstLetterUpperCase(string){
  const firstLetter = string.charAt(0).toUpperCase();
  return firstLetter+ string.slice(1);
}

router.get('/project:id',(req,res)=>{
  const id = req.params.id.slice(1);
  const project = projects[id];
  const templateData ={
    title: firstLetterUpperCase(project.project_name),
    description: firstLetterUpperCase(project.description),
    technology: project.technology,
    liveLink: project.live_link,
    githubLink: project.github_link,
    projectImages: project.img_urls.slice(1)
  }

  res.render('project', templateData);
});

module.exports =router;
