CREATE DATABASE petlovers;

USE petlovers;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nomeSocial VARCHAR(100),
    email VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    dataEmissaoCpf VARCHAR(100) NOT NULL,
    telefone VARCHAR(14) NOT NULL,
    rg VARCHAR (12) NOT NULL ,
    dataEmissaoRG VARCHAR(100) NOT NULL,
    nomepet VARCHAR(100),
    raca VARCHAR (100),
    genero VARCHAR (100),
    tipo VARCHAR(100)
        
);

CREATE TABLE produtos (
    idprod INT AUTO_INCREMENT PRIMARY KEY,
    nomeprod VARCHAR(100) NOT NULL,
    valorprod BOOLEAN NOT NULL,
    tipoprod VARCHAR(50) NOT NULL,
    descricaoprod TEXT NOT NULL
);

CREATE TABLE servicos (
    idserv INT AUTO_INCREMENT PRIMARY KEY,
    nomeserv VARCHAR(100) NOT NULL,
    valorserv BOOLEAN NOT NULL,
    tiposerv VARCHAR(50) NOT NULL,
    descricaoserv TEXT NOT NULL
);

CREATE TABLE compras (
    idcompra INT AUTO_INCREMENT PRIMARY KEY,
    cpf_cliente VARCHAR(14) NOT NULL,
    data_compra DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cpf) REFERENCES clientes(cpf)
);

CREATE TABLE itens_compra (
    iditem INT AUTO_INCREMENT PRIMARY KEY,
    idcompra INT NOT NULL,
    idprod INT,  -- Produto comprado (pode ser NULL caso seja um serviço)
    idserv INT,  -- Serviço comprado (pode ser NULL caso seja um produto)
    quantidade INT NOT NULL DEFAULT 1, -- Quantidade de produtos ou serviços
    valor DECIMAL(10,2) NOT NULL, -- Valor total do item
    FOREIGN KEY (idcompra) REFERENCES compras(idcompra),
    FOREIGN KEY (idprod) REFERENCES produtos(idprod),
    FOREIGN KEY (idserv) REFERENCES servicos(idserv)
);



select * from clientes;
select * from produtos;
select * from servicos;

drop table clientes;
drop table produtos;
drop table servicos;