const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

//setting up parsers  for form
app.use(express.json())
app.use(express.urlencoded({extended:true}));
//path -> we are using static file for the code down below
app.use(express.static(path.join(__dirname,'public')))

//setting up ejs + we can render for this code 
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    fs.readdir(`./files`, function(err,files){
        res.render('index',{files: files});
    })
    
});
app.get('/file/:fileName',(req,res)=>{
    fs.readFile(`./files/${req.params.fileName}`,"utf-8", function(err,fileData){
        res.render('show',{fileName: req.params.fileName,fileData: fileData})
    })    
});
app.get('/edit/:fileName',(req,res)=>{
    res.render('edit',{fileName:req.params.fileName});
});

app.post('/edit',(req,res)=>{
    fs.rename(`./files/${req.body.prevName}`,`./files/${req.body.newName}`,(err)=>{
        res.redirect("/")
    })
});



app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
        res.redirect("/")
    })
    
});
app.listen(3000);
 