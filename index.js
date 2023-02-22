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
    database: 'registros'
});

conexao.connect((erro) => {
    if(erro) {
        console.error('Erro ao conectar ao banco de dados', erro);
        return;
    }

    console.log('Conectado ao banco de dados!');
});

// cria um novo cliente
app.post('/registros', (req, res) => {
    const {nome, email, data_nasc, cpf} = req.body;

    conexao.query(
        'INSERT INTO registros (nome, email, data_nasc, cpf) VALUES (nome, email, data_nasc, cpf)',
        [nome, email, data_nasc, cpf],
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

// Lista todos os registros
app.get('/registros', (req, res) => {
    conexao.query('SELECT * FROM registros', (erro, resultados) => {
      if (erro) {
        console.error('Erro ao obter os registros', erro);
        res.status(500).send('Erro ao obter os registros');
        return;
      }
  
      res.send(resultados);
    });
  });
