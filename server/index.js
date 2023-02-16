const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cadastro'
});

conexao.connect((erro) => {
    if(erro) {
        console.error('Erro ao conectar ao banco de dados', erro);
        return;
    }

    console.log('Conectado ao banco de dados!');
});

// cria um novo cliente
app.post('/clientes', (req, res) => {
    const {nome, data_nascimento, endereco, cpf} = req.body;

    conexao.query(
        'INSERT INTO clientes (nome, data_nascimento, endereco, cpf) VALUES (?, ?, ?, ?)',
        [nome, data_nascimento, endereco, cpf],
        (erro, resultado) => {
             if(erro) {
                console.log('Erro ao adicionar o cliente', erro);
                res.status(500).send('Erro ao adicionar o cliente');
                return;
             }

             res.status(201).send('Cliente adicionado com sucesso');
        }
    );
});

// Lista todos os clientes
app.get('/clientes', (req, res) => {
    conexao.query('SELECT * FROM clientes', (erro, resultados) => {
      if (erro) {
        console.error('Erro ao obter os clientes', erro);
        res.status(500).send('Erro ao obter os clientes');
        return;
      }
  
      res.send(resultados);
    });
  });
