import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { insertMaskInCpf } from "../functions/cpf";

const CadastroCompra = () => {
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [compra, setCompra] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cpfCliente, setCpfCliente] = useState("");
  const [tipoItem, setTipoItem] = useState("produto");

  useEffect(() => {
    const produtos = localStorage.getItem("produtos");
    const servicos = localStorage.getItem("servicos");

    if (produtos) {
      setProdutos(JSON.parse(produtos) || []);
    }
    if (servicos) {
      setServicos(JSON.parse(servicos) || []);
    }
  }, []);

  const isProduto = (item) => item.nomeprod !== undefined;

  const handleSelectItem = (e) => {
    const selected =
      tipoItem === "produto"
        ? produtos.find((produto) => produto.nomeprod === e.target.value)
        : servicos.find((servico) => servico.nomeserv === e.target.value);
    setSelectedItem(selected);
  };

  const handleCpfChange = (e) => {
    setCpfCliente(insertMaskInCpf(e.target.value));
  };

  const handleCadastrarCompra = () => {
    const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
    const clienteExistente = clientes.find((cliente) => cliente.cpf.valor === cpfCliente);

    if (!clienteExistente) {
      alert("CPF não cadastrado! Registre o cliente antes.");
      return;
    }

    if (selectedItem && cpfCliente) {
      const novaCompra = {
        clienteCpf: cpfCliente,
        itemNome: isProduto(selectedItem) ? selectedItem.nomeprod : selectedItem.nomeserv,
        valorCompra: isProduto(selectedItem) ? selectedItem.valorprod : selectedItem.valorserv,
        tipoItem,
      };

      // Adicionar a nova compra ao cliente
      clienteExistente.compras = clienteExistente.compras || [];
      clienteExistente.compras.push(novaCompra);

      const updatedClientes = clientes.map((cliente) =>
        cliente.cpf.valor === cpfCliente ? clienteExistente : cliente
      );
      localStorage.setItem("clientes", JSON.stringify(updatedClientes));

      // Limpar campos após cadastro
      setCompra(novaCompra);
      setSelectedItem(null);
      setCpfCliente("");
      setTipoItem("produto");

      alert("Compra registrada com sucesso!");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
      secondary: { main: "#ff5722" },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" gutterBottom align="center">
          Cadastro de Compra
        </Typography>
        <Card>
          <CardContent>
            <Box mb={2}>
              <TextField
                fullWidth
                label="CPF do Cliente"
                value={cpfCliente}
                onChange={handleCpfChange}
                placeholder="Digite o CPF"
                variant="outlined"
              />
            </Box>

            <Box mb={2}>
              <FormControl fullWidth>
                <Select
                  labelId="tipoItem-label"
                  value={tipoItem}
                  onChange={(e) => setTipoItem(e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="produto">Produto</MenuItem>
                  <MenuItem value="servico">Serviço</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel id="itemSelect-label">
                  {tipoItem === "produto" ? "Selecione o Produto" : "Selecione o Serviço"}
                </InputLabel>
                <Select
                  labelId="itemSelect-label"
                  onChange={handleSelectItem}
                  value={selectedItem ? (isProduto(selectedItem) ? selectedItem.nomeprod : selectedItem.nomeserv) : ""}
                >
                  {(tipoItem === "produto" ? produtos : servicos).map((item, index) => (
                    <MenuItem key={index} value={isProduto(item) ? item.nomeprod : item.nomeserv}>
                      {isProduto(item) ? item.nomeprod : item.nomeserv}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {selectedItem && (
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>Nome:</strong> {isProduto(selectedItem) ? selectedItem.nomeprod : selectedItem.nomeserv}
                </Typography>
                <Typography variant="body1">
                  <strong>Valor:</strong> R$ {isProduto(selectedItem) ? selectedItem.valorprod : selectedItem.valorserv}
                </Typography>
                <Typography variant="body1">
                  <strong>Descrição:</strong> {isProduto(selectedItem) ? selectedItem.descricaoprod : selectedItem.descricaoserv}
                </Typography>
              </Alert>
            )}

            <Button variant="contained" color="primary" fullWidth onClick={handleCadastrarCompra}>
              Cadastrar Compra
            </Button>
          </CardContent>
        </Card>

        {compra && (
          <Alert severity="success" sx={{ mt: 3 }}>
            Compra realizada com sucesso!
            <Typography variant="body2">
              <strong>{compra.tipoItem === "produto" ? "Produto" : "Serviço"}:</strong> {compra.itemNome}
            </Typography>
            <Typography variant="body2">
              <strong>Valor:</strong> R$ {compra.valorCompra}
            </Typography>
          </Alert>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CadastroCompra;
