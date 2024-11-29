const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Habilitar CORS para permitir chamadas de frontend
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Incluído PUT
    allowedHeaders: ['Content-Type'], // Incluído para aceitar cabeçalhos
    credentials: true,
}));

app.use(express.json()); // Para parsear JSON no corpo das requisições

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost', // Endereço do seu banco de dados
    user: 'root', // Seu usuário MySQL
    password: 'fatec', // Sua senha MySQL
    database: 'petlovers', // Nome do seu banco de dados
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

// Endpoint para pegar todos os clientes
app.get('/pegarcliente', (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) {
            console.error('Erro ao consultar clientes:', err);
            return res.status(500).send('Erro ao consultar clientes');
        }
        res.json(results);
    });
});

// Endpoint para adicionar um cliente
app.post('/clientes', (req, res) => {
    const { nome, nomeSocial, email, cpf, dataEmissaoCpf, telefone, rg, dataEmissaoRG, nomepet, raca, genero, tipo } = req.body;

    console.log(rg)

    // Validação de campos obrigatórios
    if (!nome || !email || !cpf  || !dataEmissaoCpf || !telefone || !rg  || !dataEmissaoRG) {
        console.log(`Campos faltando: Nome - ${nome}, Email - ${email}, CPF - ${cpf}, RG - ${rg}`);
        return res.status(400).send('Os campos obrigatórios devem ser preenchidos.');
    }
    
    db.query(
        `INSERT INTO clientes (nome, nomeSocial, email, cpf, dataEmissaoCpf, telefone, rg, dataEmissaoRG, nomepet, raca, genero, tipo) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nome, nomeSocial || null, email, cpf , dataEmissaoCpf, telefone, rg, dataEmissaoRG, nomepet || null, raca || null, genero || null, tipo || null],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar cliente:', err);
                return res.status(500).send('Erro ao adicionar cliente');
            }
            res.status(201).send('Cliente adicionado com sucesso');
        }
    );
});

app.post('/produtos', (req, res) => {
    const { nomeprod, tipoprod, valorprod, descricaoprod } = req.body;

    console.log(nomeprod, tipoprod, valorprod, descricaoprod);

    // Validação de campos obrigatórios
    if (!nomeprod || !tipoprod || !valorprod || !descricaoprod) {
        console.log(`Campos faltando: Nome - ${nomeprod}, Tipo - ${tipoprod}, Valor - ${valorprod}, Descrição - ${descricaoprod}`);
        return res.status(400).send('Os campos obrigatórios devem ser preenchidos.');
    }
    
    db.query(
        `INSERT INTO produtos (nomeprod, valorprod, tipoprod, descricaoprod) 
         VALUES (?, ?, ?, ?)`,
        [nomeprod, valorprod, tipoprod, descricaoprod],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar produto:', err);
                return res.status(500).send('Erro ao adicionar produto');
            }
            res.status(201).send('Produto cadastrado com sucesso');
        }
    );
});;

app.post('/servicos', (req, res) => {
    const { nomeserv, tiposerv, valorserv, descricaoserv } = req.body;

    console.log(nomeserv, tiposerv, valorserv, descricaoserv);

    // Validação de campos obrigatórios
    if (!nomeserv || !tiposerv || !valorserv || !descricaoserv) {
        console.log(`Campos faltando: Nome - ${nomeserv}, Tipo - ${tiposerv}, Valor - ${valorserv}, Descrição - ${descricaoserv}`);
        return res.status(400).send('Os campos obrigatórios devem ser preenchidos.');
    }
    
    db.query(
        `INSERT INTO servicos (nomeserv, valorserv, tiposerv, descricaoserv) 
         VALUES (?, ?, ?, ?)`,
        [nomeserv, valorserv, tiposerv, descricaoserv],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar serviço:', err);
                return res.status(500).send('Erro ao adicionar serviço');
            }
            res.status(201).send('Serviço cadastrado com sucesso');
        }
    );
});

app.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos', (err, results) => {
        if (err) {
            console.error('Erro ao consultar produtos:', err);
            return res.status(500).send('Erro ao consultar produtos');
        }
        res.json(results);
    });
});


app.get('/servicos', (req, res) => {
    db.query('SELECT * FROM servicos', (err, results) => {
        if (err) {
            console.error('Erro ao consultar serviços:', err);
            return res.status(500).send('Erro ao consultar serviços');
        }
        res.json(results);
    });
});


app.delete('/deletarproduto/:id', (req, res) => {
    const id = req.params.id;
    console.log(`ID recebido para exclusão de produto: ${id}`);

    db.query('DELETE FROM produtos WHERE idprod = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar produto:', err);
            return res.status(500).send('Erro ao deletar produto');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Produto não encontrado');
        }

        res.send('Produto deletado com sucesso');
    });
});


app.delete('/deletarservico/:id', (req, res) => {
    const id = req.params.id;
    console.log(`ID recebido para exclusão de serviço: ${id}`);

    db.query('DELETE FROM servicos WHERE idserv = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar serviço:', err);
            return res.status(500).send('Erro ao deletar serviço');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Serviço não encontrado');
        }

        res.send('Serviço deletado com sucesso');
    });
});


app.put('/atualizarproduto/:id', (req, res) => {
    const id = req.params.id;
    const { nomeprod, tipoprod, valorprod, descricaoprod } = req.body;

    // Validação de campos obrigatórios
    if (!nomeprod || !tipoprod || !valorprod || !descricaoprod) {
        return res.status(400).send('Os campos Nome, Tipo, Valor e Descrição são obrigatórios para a atualização.');
    }

    db.query(
        `UPDATE produtos SET nomeprod = ?, tipoprod = ?, valorprod = ?, descricaoprod = ? WHERE idprod = ?`,
        [nomeprod, tipoprod, valorprod, descricaoprod, id],
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar produto:', err);
                return res.status(500).send('Erro ao atualizar produto');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('Produto não encontrado');
            }

            res.send('Produto atualizado com sucesso');
        }
    );
});


app.put('/atualizarservico/:id', (req, res) => {
    const id = req.params.id;
    const { nomeserv, tiposerv, valorserv, descricaoserv } = req.body;

    // Validação de campos obrigatórios
    if (!nomeserv || !tiposerv || !valorserv || !descricaoserv) {
        return res.status(400).send('Os campos Nome, Tipo, Valor e Descrição são obrigatórios para a atualização.');
    }

    db.query(
        `UPDATE servicos SET nomeserv = ?, tiposerv = ?, valorserv = ?, descricaoserv = ? WHERE idserv = ?`,
        [nomeserv, tiposerv, valorserv, descricaoserv, id],
        (err, results) => {
            if (err) {
                console.error('Erro ao atualizar serviço:', err);
                return res.status(500).send('Erro ao atualizar serviço');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('Serviço não encontrado');
            }

            res.send('Serviço atualizado com sucesso');
        }
    );
});


app.post('/compras', (req, res) => {
    const { clienteCpf, produtoId, servicoId, valorTotal } = req.body;

    console.log(clienteCpf, produtoId, servicoId, valorTotal);

    // Validação de campos obrigatórios
    if (!clienteCpf || (!produtoId && !servicoId) || !valorTotal) {
        return res.status(400).send('Os campos Cliente CPF, Produto ou Serviço e Valor Total são obrigatórios.');
    }

    // Verificar se o cliente existe
    db.query('SELECT * FROM clientes WHERE cpf = ?', [clienteCpf], (err, results) => {
        if (err) {
            console.error('Erro ao consultar cliente:', err);
            return res.status(500).send('Erro ao consultar cliente');
        }
        if (results.length === 0) {
            return res.status(404).send('Cliente não encontrado');
        }

        // Inserir a compra no banco de dados
        db.query(
            `INSERT INTO compras (clienteCpf, produtoId, servicoId, valorTotal) 
             VALUES (?, ?, ?, ?)`,
            [clienteCpf, produtoId || null, servicoId || null, valorTotal],
            (err, results) => {
                if (err) {
                    console.error('Erro ao registrar compra:', err);
                    return res.status(500).send('Erro ao registrar compra');
                }
                res.status(201).send('Compra registrada com sucesso');
            }
        );
    });
});



app.delete('/deletarcliente/:cpf', (req, res) => {
    const cpf = req.params.cpf;
    console.log(`CPF recebido para exclusão: ${cpf}`);

    db.query('DELETE FROM clientes WHERE cpf = ?', [cpf], (err, results) => {
        if (err) {
            console.error('Erro ao deletar cliente:', err);
            return res.status(500).send('Erro ao deletar cliente');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Cliente não encontrado');
        }

        res.send('Cliente deletado com sucesso');
    });

    // Endpoint para atualizar um cliente
    app.put('/atualizarcliente/:cpf', (req, res) => {
        const cpf = req.params.cpf;
        const { nome, nomeSocial, email, telefone, nomepet, raca, genero, tipo } = req.body;
    
        // Validação de campos obrigatórios
        if (!nome || !email || !telefone || !nomepet || !raca || !genero || !tipo) {
            return res.status(400).send('Os campos Nome, Email, Telefone, Nome do Pet, Raça, Gênero e Tipo são obrigatórios para a atualização.');
        }
    
        // Atualizar os dados do cliente no banco de dados
        db.query(
            `UPDATE clientes SET nome = ?, nomeSocial = ?, email = ?, telefone = ?, nomepet = ?, raca = ?, genero = ?, tipo = ? 
             WHERE cpf = ?`,
            [nome, nomeSocial || null, email, telefone, nomepet, raca, genero, tipo, cpf],
            (err, results) => {
                if (err) {
                    console.error('Erro ao atualizar cliente:', err);
                    return res.status(500).send('Erro ao atualizar cliente');
                }
    
                if (results.affectedRows === 0) {
                    return res.status(404).send('Cliente não encontrado');
                }
    
                res.send('Cliente atualizado com sucesso');
            }
        );
    });
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

