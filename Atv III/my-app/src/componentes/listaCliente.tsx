import { useState, useEffect } from "react";
import { insertMaskInCpf } from "../functions/cpf";
import { insertMaskInTelefone } from "../functions/telefonemask";

type Pet = {
  nome: string;
  tipo: string;
  raca: string;
  genero: string;
};

type Cliente = {
  nome: string;
  nomeSocial?: string;
  email: string;
  telefone: { numero: string };
  cpf: { valor: string };
  rg: { valorrg: string };
  pet: Pet[];
  compras: { nomeProduto: string; valor: number }[];
};

type Props = {
  tema: string;
};

const ListaCliente = ({ tema }: Props) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    const clientesLocalStorage = localStorage.getItem("clientes");
    if (clientesLocalStorage) {
      try {
        const parsedClientes = JSON.parse(clientesLocalStorage);
        if (Array.isArray(parsedClientes) && parsedClientes.every(cliente => cliente.nome)) {
          setClientes(parsedClientes);
        }
      } catch (error) {
        console.error("Erro ao analisar os dados do localStorage:", error);
      }
    }
  }, []);

  const toggleDropdown = (index: number) => {
    setExpandedIndex(prevState => (prevState === index ? null : index));
  };

  const deleteCliente = (cpf: string) => {
    const updatedClientes = clientes.filter(cliente => cliente.cpf.valor !== cpf);
    setClientes(updatedClientes);
    localStorage.setItem("clientes", JSON.stringify(updatedClientes));
  };

  const enableEdit = (cliente: Cliente, index: number) => {
    setEditIndex(index);
    setEditingCliente({ ...cliente });
  };

  const handleChange = (field: string, value: string, petIndex?: number) => {
    if (editingCliente) {
      if (petIndex !== undefined) {
        const updatedPets = [...editingCliente.pet];
        updatedPets[petIndex] = { ...updatedPets[petIndex], [field]: value };
        setEditingCliente({ ...editingCliente, pet: updatedPets });
      } else if (field === "telefone") {
        const maskedTelefone = insertMaskInTelefone(value);
        setEditingCliente({
          ...editingCliente,
          telefone: { ...editingCliente.telefone, numero: maskedTelefone }
        });
      } else {
        setEditingCliente({ ...editingCliente, [field]: value });
      }
    }
  };

  const saveEdit = () => {
    if (editingCliente && editIndex !== null) {
      const updatedClientes = [...clientes];
      updatedClientes[editIndex] = editingCliente;
      setClientes(updatedClientes);
      setEditIndex(null);
      setEditingCliente(null);
      localStorage.setItem("clientes", JSON.stringify(updatedClientes));
    }
  };

  return (
    <div className="container-fluid">
      <div className="list-group">
        {clientes.map((cliente, index) => (
          <div key={index}>
            <a
              href="#"
              className="list-group-item list-group-item-action"
              style={index === 3 ? { backgroundColor: tema } : {}}
              onClick={() => toggleDropdown(index)}
            >
              {cliente.nome}
            </a>

            {expandedIndex === index && (
              <div className="dropdown-content" style={{ padding: "20px", border: "1px solid #ddd", position: "relative" }}>
                {editIndex !== index && (
                  <>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteCliente(cliente.cpf.valor)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        padding: "5px 10px"
                      }}
                    >
                      Deletar
                    </button>

                    <button
                      className="btn btn-info"
                      onClick={() => enableEdit(cliente, index)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "90px",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        padding: "5px 10px"
                      }}
                    >
                      Atualizar
                    </button>
                  </>
                )}

                {editIndex === index && editingCliente ? (
                  <div>
                    <input
                      type="text"
                      className="inputscadastrocliente2"
                      value={editingCliente.nome}
                      onChange={(e) => handleChange("nome", e.target.value)}
                      placeholder="Nome"
                    />
                    <input
                      type="text"
                      className="inputscadastrocliente2"
                      value={editingCliente.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      className="inputscadastrocliente2"
                      value={editingCliente.telefone.numero}
                      onChange={(e) => handleChange("telefone", e.target.value)}
                      placeholder="Telefone"
                    />

                    <div>
                      {editingCliente.pet.map((pet, petIndex) => (
                        <div key={petIndex} style={{ marginBottom: "10px" }}>
                          <input
                            type="text"
                            className="inputscadastrocliente2"
                            value={pet.nome}
                            onChange={(e) => handleChange("nome", e.target.value, petIndex)}
                            placeholder="Nome do Pet"
                          />
                          <input
                            type="text"
                            className="inputscadastrocliente2"
                            value={pet.tipo}
                            onChange={(e) => handleChange("tipo", e.target.value, petIndex)}
                            placeholder="Tipo do Pet"
                          />
                          <input
                            type="text"
                            className="inputscadastrocliente2"
                            value={pet.raca}
                            onChange={(e) => handleChange("raca", e.target.value, petIndex)}
                            placeholder="Raça do Pet"
                          />
                          <input
                            type="text"
                            className="inputscadastrocliente2"
                            value={pet.genero}
                            onChange={(e) => handleChange("genero", e.target.value, petIndex)}
                            placeholder="Gênero do Pet"
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      className="btn btn-success"
                      onClick={saveEdit}
                      style={{ backgroundColor: "green", color: "white", padding: "5px 10px" }}
                    >
                      Salvar
                    </button>
                  </div>
                ) : (
                  <div>
                    {cliente.nomeSocial && <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>}
                    <p><strong>Email:</strong> {cliente.email || "Não informado"}</p>
                    <p><strong>Telefone:</strong> {cliente.telefone.numero || "Não informado"}</p>
                    <p><strong>CPF:</strong> {cliente.cpf.valor}</p>
                    <p><strong>RG:</strong> {cliente.rg.valorrg}</p>

                    {cliente.pet.length > 0 ? (
                      <ul>
                        {cliente.pet.map((pet, petIndex) => (
                          <li key={petIndex}>
                            <p><strong>Nome do Pet:</strong> {pet.nome}</p>
                            <p><strong>Tipo do Pet:</strong> {pet.genero}</p>
                            <p><strong>Raça do Pet:</strong> {pet.raca}</p>
                            <p><strong>Gênero do Pet:</strong> {pet.tipo}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Este cliente não tem pets.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaCliente;
