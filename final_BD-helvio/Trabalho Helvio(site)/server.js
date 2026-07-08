const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// mudar senha se for outro pc
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'classes_rpg'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao MySQL! Banco: classes_rpg');
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/lista_herois.html');
});

app.get('/herois', (req, res) => {
    const sql = `SELECT h.id_heroi, h.nome, c.nome_classe, h.nivel_atual, h.data_desbloqueio 
                 FROM herois h INNER JOIN classes c ON h.id_classe_fk = c.id_classe`;
    db.query(sql, (err, results) => {
        if (err) throw err; res.json(results);
    });
});

app.post('/herois', (req, res) => {
    const { nome, id_classe_fk, nivel_atual, data_desbloqueio } = req.body;
    const sql = `INSERT INTO herois (nome, id_classe_fk, nivel_atual, data_desbloqueio) VALUES (?, ?, ?, ?)`;
    db.query(sql, [nome, id_classe_fk, nivel_atual, data_desbloqueio], (err) => {
        if (err) throw err; res.json({ message: 'Herói adicionado!' });
    });
});

app.put('/herois/:id', (req, res) => {
    const { nivel_atual } = req.body; const { id } = req.params;
    db.query(`UPDATE herois SET nivel_atual = ? WHERE id_heroi = ?`, [nivel_atual, id], (err) => {
        if (err) throw err; res.json({ message: 'Nível atualizado!' });
    });
});

app.delete('/herois/:id', (req, res) => {
    db.query(`DELETE FROM herois WHERE id_heroi = ?`, [req.params.id], (err) => {
        if (err) throw err; res.json({ message: 'Herói excluído!' });
    });
});

app.get('/equipamentos', (req, res) => {
    const sql = `SELECT e.id_equipamento, e.nome_equipamento, e.poder_ataque, e.data_forja, e.id_heroi_fk, h.nome AS nome_heroi 
                 FROM equipamentos e LEFT JOIN herois h ON e.id_heroi_fk = h.id_heroi`;
    db.query(sql, (err, results) => {
        if (err) throw err; res.json(results);
    });
});

app.post('/equipamentos', (req, res) => {
    const { nome_equipamento, poder_ataque, data_forja, id_heroi_fk } = req.body;
    const sql = `INSERT INTO equipamentos (nome_equipamento, poder_ataque, data_forja, id_heroi_fk) VALUES (?, ?, ?, ?)`;
    db.query(sql, [nome_equipamento, poder_ataque, data_forja, id_heroi_fk], (err) => {
        if (err) throw err; res.json({ message: 'Equipamento registrado!' });
    });
});

app.delete('/equipamentos/:id', (req, res) => {
    db.query(`DELETE FROM equipamentos WHERE id_equipamento = ?`, [req.params.id], (err) => {
        if (err) throw err; res.json({ message: 'Equipamento destruído!' });
    });
});

app.get('/relatorio', (req, res) => {
    const sql = `SELECT h.nome, COUNT(e.id_equipamento) AS qtd_equipamentos, COALESCE(SUM(e.poder_ataque), 0) AS poder_total 
                 FROM herois h LEFT JOIN equipamentos e ON h.id_heroi = e.id_heroi_fk GROUP BY h.nome`;
    db.query(sql, (err, results) => {
        if (err) throw err; res.json(results);
    });
});

app.get('/herois/filtro/:classe', (req, res) => {
    const { classe } = req.params;
    let sql = `SELECT h.id_heroi, h.nome, c.nome_classe, h.nivel_atual, h.data_desbloqueio 
               FROM herois h INNER JOIN classes c ON h.id_classe_fk = c.id_classe`;
    if (classe !== 'Todos') sql += ` WHERE c.nome_classe = ?`;
    
    db.query(sql, classe !== 'Todos' ? [classe] : [], (err, results) => {
        if (err) throw err; res.json(results);
    });
});

app.get('/herois/sem-equipamento', (req, res) => {
    const sql = `SELECT nome FROM herois WHERE id_heroi NOT IN (SELECT id_heroi_fk FROM equipamentos WHERE id_heroi_fk IS NOT NULL)`;
    db.query(sql, (err, results) => {
        if (err) throw err; res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});