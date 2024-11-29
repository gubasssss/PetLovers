import React, { useState, useEffect } from "react";
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
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete, Edit, Close } from "@mui/icons-material";

const ListaCliente = ({ tema }) => {
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const generos = ["Macho", "Fêmea"];
  const tipos = ["Cachorro", "Gato", "Pássaro"];

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:5000/pegarcliente");
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  // Deletar cliente
  const deleteCliente = async (cpf) => {
    try {
      const response = await fetch("http://localhost:5000/deletarcliente/${cpf}", {
        method: "DELETE",
      });

      if (response.ok) {
        setClientes((prev) => prev.filter((cliente) => cliente.cpf !== cpf));
        alert("Cliente deletado com sucesso!");
      } else {
        const errorText = await response.text();
        alert('Erro ao deletar cliente: ${errorText}');
      }
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      alert("Erro ao deletar cliente no servidor");
    }
  };

  // Abrir modal para edição
  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setShowDialog(true);
  };

  // Atualizar cliente
  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/atualizarcliente/${editingCliente.cpf}",{
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingCliente)
        }
      );

      if (response.ok) {
        setClientes((prev) =>
          prev.map((cliente) =>
            cliente.cpf === editingCliente.cpf ? editingCliente : cliente
          )
        );
        setShowDialog(false);
        alert("Cliente atualizado com sucesso!");
      } else {
        const errorText = await response.text();
        alert('Erro ao atualizar cliente: ${errorText}');
      }
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente no servidor");
    }
  };

  // Fechar diálogo
  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingCliente(null);
  };

  // Atualizar campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: tema }}>
        Lista de Clientes
      </Typography>

      {/* Tabela de clientes */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: tema }}>
            <TableRow>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>Nome Social</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>CPF</strong></TableCell>
              <TableCell><strong>Data de Emissão CPF</strong></TableCell>
              <TableCell><strong>Telefone</strong></TableCell>
              <TableCell><strong>RG</strong></TableCell>
              <TableCell><strong>Data de Emissão RG</strong></TableCell>
              <TableCell><strong>Nome do Pet</strong></TableCell>
              <TableCell><strong>Raça</strong></TableCell>
              <TableCell><strong>Gênero</strong></TableCell>
              <TableCell><strong>Tipo</strong></TableCell>


              <TableCell><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.cpf}>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.nomeSocial}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.cpf}</TableCell>
                <TableCell>{cliente.dataEmissaoCpf}</TableCell>
                <TableCell>{cliente.telefone}</TableCell>
                <TableCell>{cliente.rg}</TableCell>
                <TableCell>{cliente.dataEmissaoRG}</TableCell>
                <TableCell>{cliente.nomepet}</TableCell>
                <TableCell>{cliente.raca}</TableCell>
                <TableCell>{cliente.genero}</TableCell>
                <TableCell>{cliente.tipo}</TableCell>







                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(cliente)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteCliente(cliente.cpf)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de edição */}
      {showDialog && (
        <Dialog open={showDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            Editar Cliente
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
              name="nome"
              fullWidth
              value={editingCliente?.nome || ""}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Nome Social"
              name="nomeSocial"
              fullWidth
              value={editingCliente?.nomeSocial || ""}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              fullWidth
              value={editingCliente?.email || ""}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Telefone"
              name="telefone"
              fullWidth
              value={editingCliente?.telefone || ""}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Gênero"
              name="genero"
              select
              fullWidth
              value={editingCliente?.genero || ""}
              onChange={handleInputChange}
            >
              {generos.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label="Tipo"
              name="tipo"
              select
              fullWidth
              value={editingCliente?.tipo || ""}
              onChange={handleInputChange}
            >
              {tipos.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleUpdateSubmit} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default ListaCliente;