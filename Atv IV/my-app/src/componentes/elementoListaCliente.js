import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

export default function ElementoListaCliente(props) {
  const {
    id,
    nome,
    nomeSocial,
    email,
    endereco,
    telefones,
    onUpdate: getClientes,
  } = props;

  const [editData, setEditData] = useState({
    nome: nome || "",
    nomeSocial: nomeSocial || "",
    email: email || "",
    endereco: endereco || {
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      codigoPostal: "",
      informacoesAdicionais: "",
    },
    telefones: telefones || [{ numero: "", ddd: "" }],
  });

  const [showDetails, setShowDetails] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setEditData({
      nome: nome || "",
      nomeSocial: nomeSocial || "",
      email: email || "",
      endereco: endereco || {
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: "",
        codigoPostal: "",
        informacoesAdicionais: "",
      },
      telefones: telefones || [{ numero: "", ddd: "" }],
    });
  }, [nome, nomeSocial, email, endereco, telefones]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 1) {
      setEditData({ ...editData, [name]: value });
    } else {
      setEditData((prev) => {
        const updated = { ...prev };
        keys.reduce((acc, key, idx) => {
          if (idx === keys.length - 1) {
            acc[key] = value;
          }
          return acc[key];
        }, updated);
        return updated;
      });
    }
  };

  const handleTelefoneChange = (index, field, value) => {
    const updatedTelefones = [...editData.telefones];
    updatedTelefones[index][field] = value;
    setEditData({ ...editData, telefones: updatedTelefones });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:32831/cliente/atualizar`, editData)
      .then(() => {
        alert("Cliente atualizado com sucesso!");
        setStatus("success");
        getClientes();
      })
      .catch((error) => {
        console.error("Erro ao atualizar cliente:", error);
        setStatus("error");
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:32831/cliente/excluir`, { data: { id } })
      .then(() => {
        alert("Cliente excluído com sucesso!");
        getClientes();
      })
      .catch((error) => {
        console.error("Erro ao excluir cliente:", error);
      });
  };

  return (
    <div className="cliente-card">
      <div className="cliente-header" onClick={() => setShowDetails(!showDetails)}>
        <h3>{editData.nome}</h3>
        <button className="toggle-details-btn">
          {showDetails ? "Ocultar detalhes" : "Ver detalhes"}
        </button>
      </div>

      {showDetails && (
        <div className="cliente-details">
          <p><strong>Nome Social:</strong> {editData.nomeSocial}</p>
          <p><strong>Email:</strong> {editData.email}</p>
          <p>
            <strong>Endereço:</strong>{" "}
            {`${endereco.rua}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, CEP: ${endereco.codigoPostal} `}
          </p>
          <p>
            <strong>Informações Endereço:</strong> {endereco.informacoesAdicionais}
          </p>
          <p>
            <strong>Telefone:</strong>{" "}
            {telefones.map((tel) => `(${tel.ddd}) ${tel.numero}`).join(", ")}
          </p>
          <div className="button-group">
            <button className="btn btn-edit" data-bs-toggle="modal" data-bs-target={`#modalEditar-${id}`}>
              ✏️ Editar
            </button>
            <button className="btn btn-delete" onClick={handleDelete}>
              🗑️ Excluir
            </button>
          </div>
        </div>
      )}

      {/* Modal de edição */}
      <div className="modal fade" id={`modalEditar-${id}`} tabIndex="-1" aria-labelledby={`modalEditarLabel-${id}`} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Atualizar Cliente</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Nome"
                  name="nome"
                  value={editData.nome}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Nome Social"
                  name="nomeSocial"
                  value={editData.nomeSocial}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Estado"
                  name="endereco.estado"
                  value={editData.endereco.estado}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Cidade"
                  name="endereco.cidade"
                  value={editData.endereco.cidade}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Bairro"
                  name="endereco.bairro"
                  value={editData.endereco.bairro}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Rua"
                  name="endereco.rua"
                  value={editData.endereco.rua}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Número"
                  name="endereco.numero"
                  value={editData.endereco.numero}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Informações Adicionais"
                  name="endereco.informacoesAdicionais"
                  value={editData.endereco.informacoesAdicionais}
                  onChange={handleInputChange}
                />
                <InputMask
                  mask="99999-999"
                  className="form-control mb-3"
                  placeholder="Código Postal"
                  name="endereco.codigoPostal"
                  value={editData.endereco.codigoPostal}
                  onChange={handleInputChange}
                />
                {editData.telefones.map((tel, index) => (
                  <div key={index} className="mb-3">
                    <InputMask
                      mask="99"
                      className="form-control mb-2"
                      placeholder="DDD"
                      value={tel.ddd}
                      onChange={(e) => handleTelefoneChange(index, "ddd", e.target.value)}
                    />
                    <InputMask
                      mask="99999-9999"
                      className="form-control"
                      placeholder="Telefone"
                      value={tel.numero}
                      onChange={(e) => handleTelefoneChange(index, "numero", e.target.value)}
                    />
                  </div>
                ))}
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Fechar
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSave} data-bs-dismiss="modal">
                Salvar Mudanças
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
