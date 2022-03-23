var express = require('express');
var router = express.Router();
var axios = require('axios')

function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  axios.get("http://localhost:3000/musicas")
  .then( response => {
      let a = response.data
      // Add code to render page with the musics record
      res.render('musicas',{musicas:a});
  })
  .catch(function(erro){
      res.render('error',{error:erro});
  })
});

router.get('/insert',function(req,res,next){
    res.render('forms')
});

router.post('/',function(req,res,next){
    recuperaInfo(req, resultado => {
        console.log("POST de musica " + JSON.stringify(resultado))
        axios.post("http://localhost:3000/musicas", resultado)
        axios.get("http://localhost:3000/musicas")
            .then(response => {
                let a = response.data
                res.render('musicas',{musicas:a})
            })
            .catch(function(erro){
                res.render('error' , {error : erro})
                })
        })
});



router.get('/:id',function(req,res,next){
  var idMusica = req.params.id
  console.log(idMusica)
  axios.get("http://localhost:3000/musicas/" + idMusica)
      .then( response => {
          let a = response.data
          // Add code to render page with the music record
          res.render('musica',{musica:a});
      })
      .catch(function(erro){
          res.render('error',{error:erro});
      })
});

router.get('/prov/:prov',function(req,res,next){
  var idProv = req.params.prov
  console.log(idProv)
  axios.get("http://localhost:3000/musicas?prov=" + idProv)
      .then( response => {
          let a = response.data
          // Add code to render page with the music record
          res.render('provincia',{provincia:a});
      })
      .catch(function(erro){
          res.render('error',{error:erro});
      })
});



module.exports = router;
