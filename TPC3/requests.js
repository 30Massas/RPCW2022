const http = require("http")
const url = require("url")
const axios = require('axios')

const header = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <title>RPCW22 TPC3 - MusicAcademy</title>
    </head>
    <body>
`
const footer = `
    </body>
</html>
`

function generateMainPage(){
    page = header
    page += `<div class="w3-display-containter">`
    page += '<div class="w3-display-middle">'
    link_a = `<p class="text-align:center;"><a href="http://localhost:4000/alunos">Lista de Alunos</a></p>`
    page += link_a
    link_c = `<p class="text-align:center;"><a href="http://localhost:4000/cursos">Lista de Cursos</a></p>`
    page += link_c
    link_i = `<p class="text-align:center;"><a href="http://localhost:4000/instrumentos">Lista de Instrumentos</a></p>`
    page += link_i
    page += '</div>\n</div>'
    page += footer
    return page
}

async function getAlunosPage(res){
    var content = header 
    content += `<p><a href="http://localhost:4000/"><b>Voltar</b></a></p>`
    let result = await axios.get("http://localhost:3000/alunos")
    let data = result.data
    var keys = ['Id','Nome','Curso','Instrumento']
    content += `
    <table class="w3-table-all w3-centered w3-hoverable">
        <thead>
            <tr class="w3-light-green">
`
    for(let i=0; i<keys.length; i++){
        let head = keys[i]
        content += `<th>${head}</th>`
    }
    content += '</tr></thead>'
    data.forEach(
        a => {
            content += '<tr>'
            content += `<td><a href="http://localhost:4000/alunos/${a.id}">${a.id}</a></td>`
            content += `<td>${a.nome}</td>`
            content += `<td><a href="http://localhost:4000/cursos/${a.curso}">${a.curso}</a></td>`
            content += `<td>${a.instrumento}</td>`
            content += `</tr>`
        }
    )
    content += `</table>`
    content += footer
    // console.log(content)
    res.write(content)
    res.end()
}

async function getSpecificStudentPage(res,aluno){
    var content = header 
    content += `<p><a href="http://localhost:4000/alunos"><b>Voltar</b></a></p>`
    let result = await axios.get(`http://localhost:3000/alunos?id=${aluno}`)
    let data = result.data
    data.forEach(
        a => {
            content += `<p><b>ID:</b> ${a.id}</p>`
            content += `<p><b>Nome:</b> ${a.nome}</p>`
            content += `<p><b>Data Nascimento:</b> ${a.dataNasc}</p>`
            content += `<p><b>Curso:</b> <a href="http://localhost:4000/cursos/${a.curso}">${a.curso}</a></p>`
            content += `<p><b>Ano no Curso:</b> ${a.anoCurso}</p>`
            content += `<p><b>Instrumento:</b> ${a.instrumento}</p>`
        }
    )
    content += footer
    // console.log(content)
    res.write(content)
    res.end()
}

async function getCursosPage(res){
    var keys = ['Id','Designação','Duração','Instrumento']
    var content = header 
    content += `<p><a href="http://localhost:4000/"><b>Voltar</b></a></p>`
    let result = await axios.get("http://localhost:3000/cursos")
    let data = result.data
    content += `
    <table class="w3-table-all w3-centered w3-hoverable">
        <thead>
            <tr class="w3-light-green">
`
    for(let i=0; i<keys.length; i++){
        let head = keys[i]
        content += `<th>${head}</th>`
    }
    content += '</tr></thead>'
    data.forEach(
        a => {
            content += '<tr>'
            content += `<td><a href="http://localhost:4000/cursos/${a.id}">${a.id}</a></td>`
            content += `<td>${a.designacao}</td>`
            content += `<td>${a.duracao}</td>`
            content += `<td>${a.instrumento.text}</td>`
            content += `</tr>`
        }
    )
    content += `</table>`
    content += footer
    // console.log(content)
    res.write(content)
    res.end()
}

async function getSpecificCursoPage(res,curso){
    var content = header 
    content += `<p><a href="http://localhost:4000/cursos"><b>Voltar</b></a></p>`
    let result = await axios.get(`http://localhost:3000/cursos?id=${curso}`)
    let data = result.data
    data.forEach(
        a => {
            content += `<p><b>ID:</b> ${a.id}</p>`
            content += `<p><b>Designação:</b> ${a.designacao}</p>`
            content += `<p><b>Duração:</b> ${a.duracao}</p>`
            content += `<p><b>Instrumento:</b> <a href="http://localhost:4000/instrumentos/${a.instrumento.id}">${a.instrumento.text}</a></p>`
        }
    )
    let alunos = await axios.get(`http://localhost:3000/alunos?curso.id=${curso}`)
    let dataAlunos = alunos.data
    content += `
    <table class="w3-table-all w3-centered w3-hoverable">
        <thead>
            <tr class="w3-light-green">
    `
    var keys = ['ID','Nome','Ano']
    for(let i=0; i<keys.length; i++){
        let head = keys[i]
        content += `<th>${head}</th>`
    }
    dataAlunos.forEach(
        a => {
            content += '<tr>'
            content += `<td><a href="http://localhost:4000/alunos/${a.id}">${a.id}</a></td>`
            content += `<td>${a.nome}</td>`
            content += `<td>${a.anoCurso}</td>`
            content += `</tr>`
        }
    )
    content += footer
    // console.log(content)
    res.write(content)
    res.end()
}

async function getInstrumentosPage(res){
    var keys = ['Id','Instrumento']
    var content = header
    content += `<p><a href="http://localhost:4000/"><b>Voltar</b></a></p>`
    let result = await axios.get("http://localhost:3000/instrumentos")
    let data = result.data
    content += `
    <table class="w3-table-all w3-centered w3-hoverable">
        <thead>
            <tr class="w3-light-green">
`
    for(let i=0; i<keys.length; i++){
        let head = keys[i]
        content += `<th>${head}</th>`
    }
    content += '</tr></thead>'
    data.forEach(
        a => {
            content += '<tr>'
            content += `<td>${a.id}</td>`
            content += `<td>${a.text}</td>`
            content += `</tr>`
        }
    )
    content += `</table>`
    content += footer
    // console.log(content)
    res.write(content)
    res.end()
}

async function getSpecificInstrumentoPage(res,instrumento){
    var content = header 
    content += `<p><a href="http://localhost:4000/instrumentos"><b>Voltar</b></a></p>`
    let result = await axios.get(`http://localhost:3000/instrumentos?id=${instrumento}`)
    let data = result.data
    data.forEach(
        a => {
            content += `<p><b>ID:</b> ${a.id}</p>`
            content += `<p><b>Designação:</b> ${a.text}</p>`
        }
    )
    content += footer
    // console.log(content)
    res.write(content)
    res.end()
}

myserver = http.createServer( function(req,res){
    console.log(req.method + " " + req.url);
    var myurl = url.parse(req.url,true).pathname
    var parts = myurl.split("/")
    switch(parts[1]){
        case '':
            res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
            console.log("Main Page Requested")
            res.write(generateMainPage());
            res.end();
            break
        case 'alunos':
            if(parts[2]){
                res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
                console.log("Specific Student requested")
                getSpecificStudentPage(res,parts[2])
            }
            else{
                res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
                console.log("Student chart requested")
                getAlunosPage(res)
            }
            break
        case 'cursos':
            if(parts[2]){
                res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
                console.log("Specific Course requested")
                getSpecificCursoPage(res,parts[2])
            }
            else{
                res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
                console.log("Course chart requested")
                getCursosPage(res)
            }
            break
        case 'instrumentos':
            if(parts[2]){
                res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
                console.log("Specific Instrument requested")
                getSpecificInstrumentoPage(res,parts[2])
            }
            else{
                res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
                console.log("Instrument chart requested")
                getInstrumentosPage(res)
            }
            break
        default:
            res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
            res.end("<p> Rota não suportada: " + req.url + "</p>");        
            break
    }
})

myserver.listen(4000)
console.log("Servidor a escuta na porta 4000...")