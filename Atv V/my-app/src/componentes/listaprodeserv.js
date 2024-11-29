import React, { useState, useEffect } from "react";
import axios from "axios"; // Importar a biblioteca axios
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Edit, Close, Delete } from "@mui/icons-material";

const ListaProdutosServicos = ({ tema }) => {
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  // Função para buscar produtos e serviços do backend
  useEffect(() => {
    fetchProdutos();
    fetchServicos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get("/produtos");
      setProdutos(response.data); // Definindo os dados dos produtos no estado
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const fetchServicos = async () => {
    try {
      const response = await axios.get("/servicos");
      setServicos(response.data); // Definindo os dados dos serviços no estado
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  // Função para editar um produto ou serviço
  const handleEdit = (item, isProduto) => {
    setCurrentEdit({ ...item, isProduto });
    setShowDialog(true);
  };

  // Fechar o diálogo de edição
  const handleCloseDialog = () => {
    setShowDialog(false);
    setCurrentEdit(null);
  };

  // Atualizar os campos ao editar
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Salvar as mudanças feitas (editar produto ou serviço)
  const handleSaveChanges = async () => {
    try {
      if (currentEdit.isProduto) {
        // Atualiza o produto no backend
        await axios.put(`/produtos/${currentEdit.idprod}`, currentEdit);
        fetchProdutos(); // Recarrega a lista de produtos
      } else {
        // Atualiza o serviço no backend
        await axios.put(`/servicos/${currentEdit.idserv}`, currentEdit);
        fetchServicos(); // Recarrega a lista de serviços
      }
      setShowDialog(false);
      setCurrentEdit(null);
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  // Deletar um produto ou serviço
  const handleDelete = async (item, isProduto) => {
    try {
      if (isProduto) {
        await axios.delete(`/produtos/${item.idprod}`);
        fetchProdutos(); // Recarrega a lista de produtos
      } else {
        await axios.delete(`/servicos/${item.idserv}`);
        fetchServicos(); // Recarrega a lista de serviços
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  // Listar produtos
  const listProdutos = produtos.map((produto) => (
    <TableRow key={produto.idprod}>
      <TableCell>{produto.nomeprod}</TableCell>
      <TableCell>{produto.valorprod}</TableCell>
      <TableCell>{produto.tipoprod}</TableCell>
      <TableCell>{produto.descricaoprod}</TableCell>
      <TableCell>
        <IconButton
          color="primary"
          onClick={() => handleEdit(produto, true)}
        >
          <Edit />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => handleDelete(produto, true)}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  // Listar serviços
  const listServicos = servicos.map((servico) => (
    <TableRow key={servico.idserv}>
      <TableCell>{servico.nomeserv}</TableCell>
      <TableCell>{servico.valorserv}</TableCell>
      <TableCell>{servico.tiposerv}</TableCell>
      <TableCell>{servico.descricaoserv}</TableCell>
      <TableCell>
        <IconButton
          color="primary"
          onClick={() => handleEdit(servico, false)}
        >
          <Edit />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => handleDelete(servico, false)}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: tema }}>
        Gestão de Produtos e Serviços
      </Typography>

      {/* Produtos */}
      <Typography variant="h5" sx={{ marginTop: 3, color: tema }}>
        Produtos
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: tema }}>
            <TableRow>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Preço (R$)</strong></TableCell>
              <TableCell><strong>Tipo</strong></TableCell>
              <TableCell><strong>Descrição</strong></TableCell>
              <TableCell><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{listProdutos}</TableBody>
        </Table>
      </TableContainer>

      {/* Serviços */}
      <Typography variant="h5" sx={{ marginTop: 5, color: tema }}>
        Serviços
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: tema }}>
            <TableRow>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Preço (R$)</strong></TableCell>
              <TableCell><strong>Tipo</strong></TableCell>
              <TableCell><strong>Descrição</strong></TableCell>
              <TableCell><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{listServicos}</TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de Edição */}
      {showDialog && currentEdit && (
        <Dialog open={showDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            Editar {currentEdit.nomeprod || currentEdit.nomeserv}
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={handleCloseDialog}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nome"
              name={currentEdit.isProduto ? "nomeprod" : "nomeserv"}
              fullWidth
              value={currentEdit.nomeprod || currentEdit.nomeserv}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Preço (R$)"
              name={currentEdit.isProduto ? "valorprod" : "valorserv"}
              fullWidth
              type="number"
              value={currentEdit.valorprod || currentEdit.valorserv}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSaveChanges} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ListaProdutosServicos;
