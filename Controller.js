const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models');
const { Op } = require("sequelize");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

let tarefa = models.Tarefa;
let subtarefa = models.SubTarefa;

//Inserir uma nova Tarefa
app.get('/tarefa/inserir',async(req,res) => {
    let inserir = await tarefa.create({
        titulo: "Teste 2",
        prazo:  new Date(),
        descricao: "Esse é o segundo teste",
        status: "Concluido",
        dataFazer: new Date(),
        tempoTotal: 120,
        createdAt: new Date(),
        updateAt:new Date()
    });
    res.send("Tarefa inserida com sucesso!");
});

//Inserir uma sub tarefa
app.get('/subtarefa/inserir',async(req,res) => {
    let inserir = await subtarefa.create({
        titulo: "SubTarefa Teste 2",
        duracao:  120,
        status: "Concluido",
        tarefaId: 2,  
        createdAt: new Date(),
        updateAt:new Date()
    });
    res.send("Sub-Tarefa inserida com sucesso!");
});

// Consulta todas as Tarefas
app.get('/tarefa/consulta',async(req,res) => {
    let consulta = await tarefa.findAll({
        attributes: ['id','titulo','prazo','descricao','status','dataFazer','tempoTotal']
    });
    if(consulta === null) {
        res.send(JSON.stringify(value='erro'));
    } else {
        res.send(consulta);
    }
});

// Consulta todas as Sub-Tarefas
app.get('/subtarefa/consulta',async(req,res) => {
    let consulta = await subtarefa.findAll({
        attributes: ['titulo','duracao','status','tarefaId']
    });
    res.send(consulta);
});

// Consulta as sub-tarefas de uma tarefa
app.get('/tarefa/consulta_subtarefas',async(req,res) => {
    let consulta = await subtarefa.findAll({where: {tarefaId: 2} , attributes: ['titulo', 'duracao', 'status']});
    res.send(consulta);
});

// Consulta uma tarefa
app.get('/tarefa/consulta2',async(req,res) => {
    let consulta = await tarefa.findAll({where: {id: 2} , attributes: ['titulo','prazo','descricao','status','dataFazer','tempoTotal']});
    res.send(consulta);
});

// Cosulta uma subtarefa
app.get('/subtarefa/consulta2',async(req,res) => {
    let consulta = await subtarefa.findAll({where: {id: 2} , attributes: ['titulo', 'duracao', 'status']});
    res.send(consulta);
});

// Altera uma tarefa
app.get('/tarefa/alterar',async(req,res) =>{
    let alterar = await tarefa.update({
        titulo: "Alterando Tarefa 2",
        updateAt: new Date()
    },
    {where: {id : 2}}
    );
    res.send(alterar);
});

// Altera uma subtarefa
app.get('/subtarefa/alterar', async(req,res) => {
    let alterar = await subtarefa.update({
       titulo: "Nova subtarefa2",
       updateAt: new Date(), 
    },    
    {where: {id : 2}}
    );
    res.send(alterar);
});

//Deleta uma tarefa
app.get('/tarefa/excluir',async(req,res) =>{
    let excluir = await tarefa.destroy({
        where: {id : 2}
    });
    res.send(excluir);
});

//Deleta uma subtarefa
app.get('/subtarefa/excluir', async(req,res) =>{
    let excluir = await subtarefa.destroy({
        where: {id : 1}
    });
    res.send(excluir);  
});

//Inserir e alterar tarefa
app.post('/tarefa/grava',async(req,res) =>{
    if(req.body.id == null){
        // inclusão
        let insere = await tarefa.create({
            titulo: req.body.titulo,
            prazo: req.body.prazo,
            descricao: req.body.descricao,
            status: req.body.status,
            dataFazer: req.body.dataFazer,
            tempoTotal: req.body.tempoTotal,
            createdAt: new Date(),
            updateAt: new Date()
        });
        console.log(insere);
        res.send(JSON.stringify(value='Inclusao ok'));
    } else {
        // alteração
        let alterar = await tarefa.update({
            titulo: req.body.titulo,
            prazo: req.body.prazo,
            descricao: req.body.descricao,
            status: req.body.status,
            dataFazer: req.body.dataFazer,
            tempoTotal: req.body.tempoTotal,
            updateAt: new Date()
        }, 
            {where: {id: req.body.id} 
        });
        console.log(alterar);
        if(alterar[0] == 0){
            res.send(JSON.stringify(value='Alteracao erro'));
        } else {
            res.send(JSON.stringify(value='Alteracao ok'));
        }
    }
});

//Excluir tarefa
app.post('/tarefa/exclui',async(req,res) => {
    let excluir = await tarefa.destroy({
        where: {id: req.body.id}
    });
    console.log(excluir);
    if(excluir == 0){
        res.send(JSON.stringify(value='Exclusao erro'));
    } else {
        res.send(JSON.stringify(value='Exclusao ok'));
    }
});

// Consulta todas as Tarefas ordenadas por Prazo
app.get('/cronograma',async(req,res) => {
    let consulta = await tarefa.findAll({
        attributes: ['id','titulo','prazo','descricao','status','dataFazer','tempoTotal'],
        where: {status: {[Op.like]: 'Nao Concluido'}},
        order: [
            ['prazo', 'ASC']
        ] 
    });
    if(consulta === null) {
        res.send(JSON.stringify(value='erro'));
    } else {
        res.send(consulta);
    }
});


//Verifica a progressão de termino das tarefas para a barra
app.get('/tarefa/progresso',async(req,res) => {
    let progresso = await tarefa.count({
        where: { status: {[Op.like]: 'Concluído'}}
    });
    console.log(progresso); 
    let total = await tarefa.count();
    console.log(total);
    res.send((progresso/total)*100);
})

let port = process.env.PORT || 3000;
app.listen(port,(req,res) => {
    console.log('Servidor rodando');
});

app.get('/',(req,res) => {
    res.send('Servidor rodando com sucesso!');
});