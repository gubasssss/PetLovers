import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from 'axios';

const CadastroPage = () => {
  const [showProdutoForm, setShowProdutoForm] = useState(false);
  const [showServicoForm, setShowServicoForm] = useState(false);
  const [produto, setProduto] = useState({ nomeprod: "", valorprod: 0, tipoprod: "", descricaoprod: "" });
  const [servico, setServico] = useState({ nomeserv: "", valorserv: 0, tiposerv: "", descricaoserv: "" });

  const handleCadastroProduto = () => {
    setShowProdutoForm(true);
    setShowServicoForm(false);
  };

  const handleCadastroServico = () => {
    setShowServicoForm(true);
    setShowProdutoForm(false);
  };

  const handleProdutoChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleServicoChange = (e) => {
    const { name, value } = e.target;
    setServico((prev) => ({ ...prev, [name]: value }));
  };

  const saveProduto = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/produtos', produto);
      if (response.status === 201) {
        alert("Produto cadastrado com sucesso!");
        setProduto({ nomeprod: "", valorprod: 0, tipoprod: "", descricaoprod: "" });
      }
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar produto');
    }
  };

  const saveServico = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/servicos', servico);
      if (response.status === 201) {
        alert("Serviço cadastrado com sucesso!");
        setServico({ nomeserv: "", valorserv: 0, tiposerv: "", descricaoserv: "" });
      }
    } catch (error) {
      console.error('Erro ao cadastrar serviço:', error);
      alert('Erro ao cadastrar serviço');
    }
  };

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
      secondary: { main: "#9c27b0" },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Gerenciar Cadastro
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleCadastroProduto}>
              Cadastrar Produto
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleCadastroServico}>
              Cadastrar Serviço
            </Button>
          </Grid>
        </Grid>

        {/* Formulário de Produtos */}
        {showProdutoForm && (
          <Card sx={{ mt: 4, maxWidth: 600, mx: "auto" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Cadastro de Produto
              </Typography>
              <form onSubmit={saveProduto}>
                <TextField
                  fullWidth
                  label="Nome do Produto"
                  name="nomeprod"
                  value={produto.nomeprod}
                  onChange={handleProdutoChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Valor do Produto"
                  name="valorprod"
                  type="number"
                  value={produto.valorprod}
                  onChange={handleProdutoChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Tipo do Produto"
                  name="tipoprod"
                  value={produto.tipoprod}
                  onChange={handleProdutoChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Descrição do Produto"
                  name="descricaoprod"
                  value={produto.descricaoprod}
                  onChange={handleProdutoChange}
                  margin="normal"
                  multiline
                  rows={3}
                  required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Salvar Produto
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Formulário de Serviços */}
        {showServicoForm && (
          <Card sx={{ mt: 4, maxWidth: 600, mx: "auto" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Cadastro de Serviço
              </Typography>
              <form onSubmit={saveServico}>
                <TextField
                  fullWidth
                  label="Nome do Serviço"
                  name="nomeserv"
                  value={servico.nomeserv}
                  onChange={handleServicoChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Preço do Serviço"
                  name="valorserv"
                  type="number"
                  value={servico.valorserv}
                  onChange={handleServicoChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Tipo do Serviço"
                  name="tiposerv"
                  value={servico.tiposerv}
                  onChange={handleServicoChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Descrição do Serviço"
                  name="descricaoserv"
                  value={servico.descricaoserv}
                  onChange={handleServicoChange}
                  margin="normal"
                  multiline
                  rows={3}
                  required
                />
                <Button type="submit" variant="contained" color="secondary" fullWidth>
                  Salvar Serviço
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CadastroPage;
