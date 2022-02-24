const http = require("http")
const url = require("url")
const fs = require("fs")

myserver = http.createServer( function(req,res) {
    var myurl = url.parse(req.url,true).pathname
    console.log("URL: " + myurl)
    var file = myurl.substring(1)
    var parts = myurl.split("/")
    var path_to_file = './html/'
    if(parts[1]=='filmes'){
            if(parts.length==2){
                file='filmes.html'
            }else{
                file=parts[2]+".html"
            }
        }
    else if(parts[1]=='atores'){
            if(parts.length==2){
                file='atores.html'
            }else{
                file=parts[2]+".html"
            }
        }
    else{
        file='index.html'
    }

    path_to_file += file;
    console.log(path_to_file)
    fs.readFile(path_to_file , function(err,data){
        res.writeHead(200, {"Content-Type": "text/html; text/css; application/javascript"})
        if(err){
            console.log("ERRO -> " + err)
            res.write("<p>Erro na leitura </p>")
        }
        else{
            res.write(data)
        }
        res.end()
    })
})

myserver.listen(7777)