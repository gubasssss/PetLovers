import React, { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import axios from "axios";

const FormularioCadastroCliente = () => {
    const [state, setState] = useState({
        nome: "",
        nomeSocial: "",
        email: "",
        telefone: "",
        rg: "",
        dataEmissaoRG: "",
        cpf: "",
        dataEmissaoCpf: "",
        nomepet: "",
        tipo: "",
        raca: "",
        genero: "",
        erros: {},
        erroCpfExistente: false,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { nome,nomeSocial, email, cpf, telefone, rg, dataEmissaoRG, dataEmissaoCpf, nomepet, tipo, raca, genero } = state;

        const camposObrigatorios = [nome, email, cpf, telefone, rg, dataEmissaoRG, dataEmissaoCpf, nomepet, tipo, raca, genero];
        const erros = {};

        if (camposObrigatorios.some((campo) => !campo)) {
            if (!nome) erros.nome = "Nome é obrigatório!";
            if (!email) erros.email = "E-mail é obrigatório!";
            if (!cpf) erros.cpf = "CPF é obrigatório!";
            setState({ ...state, erros });
            return;
        }

        const clienteData = { nome, nomeSocial, email, cpf, telefone, rg, dataEmissaoRG, dataEmissaoCpf, nomepet, tipo, raca, genero };

        try {
            await axios.post("http://localhost:5000/clientes", clienteData);
            alert("Cadastro realizado com sucesso!");
            setState({
                nome: "",
                nomeSocial: "",
                email: "",
                telefone: "",
                rg: "",
                dataEmissaoRG: "",
                cpf: "",
                dataEmissaoCpf: "",
                nomepet: "",
                tipo: "",
                raca: "",
                genero: "",
                erros: {},
                erroCpfExistente: false,
            });
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
        }
    };

    const { erros } = state;

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3, bgcolor: "#f9f9f9", borderRadius: 2, boxShadow: 3 }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nome"
                    name="nome"
                    fullWidth
                    margin="normal"
                    value={state.nome}
                    onChange={handleInputChange}
                    error={!!erros.nome}
                    helperText={erros.nome}
                />
                <TextField
                    label="Nome Social (Opcional)"
                    name="nomeSocial"
                    fullWidth
                    margin="normal"
                    value={state.nomeSocial}
                    onChange={handleInputChange}
                />
                <TextField
                    label="E-mail"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={state.email}
                    onChange={handleInputChange}
                    error={!!erros.email}
                    helperText={erros.email}
                />
                <TextField
                    label="CPF"
                    name="cpf"
                    fullWidth
                    margin="normal"
                    value={state.cpf}
                    onChange={handleInputChange}
                    error={!!erros.cpf}
                    helperText={erros.cpf}
                />
                <TextField
                    label="Data de Emissão do CPF"
                    name="dataEmissaoCpf"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={state.dataEmissaoCpf}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Telefone"
                    name="telefone"
                    fullWidth
                    margin="normal"
                    value={state.telefone}
                    onChange={handleInputChange}
                />
                <TextField
                    label="RG"
                    name="rg"
                    fullWidth
                    margin="normal"
                    value={state.rg}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Data de Emissão do RG"
                    name="dataEmissaoRG"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={state.dataEmissaoRG}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Nome do Pet"
                    name="nomepet"
                    fullWidth
                    margin="normal"
                    value={state.nomepet}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Raça"
                    name="raca"
                    fullWidth
                    margin="normal"
                    value={state.raca}
                    onChange={handleInputChange}
                />
                <TextField
                    select
                    label="Gênero"
                    name="genero"
                    fullWidth
                    margin="normal"
                    value={state.genero}
                    onChange={handleInputChange}
                >
                    <MenuItem value="">Selecione</MenuItem>
                    <MenuItem value="Macho">Macho</MenuItem>
                    <MenuItem value="Femea">Fêmea</MenuItem>
                    </TextField>
                <TextField
                    select
                    label="Tipo do Pet"
                    name="tipo"
                    fullWidth
                    margin="normal"
                    value={state.tipo}
                    onChange={handleInputChange}
                >
                    <MenuItem value="">Selecione</MenuItem>
                    <MenuItem value="Cachorro">Cachorro</MenuItem>
                    <MenuItem value="Gato">Gato</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
                    Cadastrar Cliente
                </Button>
            </form>
        </Box>
    );
};

export default FormularioCadastroCliente;