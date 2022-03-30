var express = require('express');
var router = express.Router();
var multer = require('multer');
var jsonfile = require('jsonfile');
var fs = require('fs');

var File = require('../controllers/file');
var upload = multer({dest:'uploads'})


/* GET home page. */
router.get('/', function(req, res, next) {
  // Working
  File.list()
    .then(data => {
      res.render('index', {files:data})
    })
    .catch(erro => {
      res.render('error', {error:erro})
    })

  // var files = jsonfile.readFileSync('./dbFiles.json')

  // res.render('index',{files:files})

});

router.post('/insert',upload.single('myFile'), (req,res) => {
  var d = new Date().toISOString().substring(0,16)

  // var files = jsonfile.readFileSync('./dbFiles.json')

  
  let oldPath =  __dirname + '/../' + req.file.path
  let newPath = __dirname + '/../public/images/' + req.file.originalname

  fs.rename(oldPath,newPath, erro =>{
    if(erro) res.render('error',{error:erro})
  })


  var file = {
    date : d,
    desc : req.body.desc,
    name : req.file.originalname,
    mimetype : req.file.mimetype,
    size : req.file.size
  }

  // files.push({
  //   date : d,
  //   name : req.file.originalname,
  //   mimetype : req.file.mimetype,
  //   size : req.file.size
  // })

  // jsonfile.writeFileSync('./dbFiles.json',files)

  File.insert(file)
    .then(() => {res.redirect(301,'/')})
    // .then(data => {res.render('index',res.redirect(307,'/'),{files:data})})
    .catch(erro => {res.render('erro',{error:erro})})
  
});

router.post('/delete/:id',(req,res)=>{
  // var files = jsonfile.readFileSync('./dbFiles.json')
  // console.log(files)
  // delete files[0][req.body.name]


  // jsonfile.writeFileSync('./dbFiles.json',files)
  // files = jsonfile.readFileSync('./dbFiles.json')
  // res.render('index',res.redirect('/'),{files:files})
  File.lookup(req.params.id)
      .then(data => {
        var path = __dirname + '/../public/images/' + data.name
        fs.unlink(path, erro => {
          if(erro) res.render('error', {error:erro})
        })
      })
      .catch(erro => {res.render('error',{error:erro})})



  File.delete(req.params.id)
      .then(() => {res.redirect(301,'/')} )
      .catch(erro => {res.render('error',{error:erro})})
 

});


module.exports = router;
