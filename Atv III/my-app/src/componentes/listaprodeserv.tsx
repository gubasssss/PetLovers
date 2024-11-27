import React, { useState, useEffect } from "react";

type Props = {
  tema: string;
};

type Produto = {
  nomeprod: string;
  valorprod: number;
  tipoprod: string;
  descricaoprod: string;
};

type Servico = {
  nomeserv: string;
  valorserv: number;
  tiposerv: string;
  descricaoserv: string;
};

const ListaProdutosServicos: React.FC<Props> = ({ tema }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [expandedProdutoIndex, setExpandedProdutoIndex] = useState<number | null>(null);
  const [expandedServicoIndex, setExpandedServicoIndex] = useState<number | null>(null);
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null);
  const [editingServico, setEditingServico] = useState<Servico | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const produtosData = localStorage.getItem("produtos");
    const servicosData = localStorage.getItem("servicos");

    if (produtosData) {
      try {
        const parsedProdutos = JSON.parse(produtosData);
        if (Array.isArray(parsedProdutos)) {
          setProdutos(parsedProdutos);
        } else {
          console.error("Os dados de produtos no localStorage não estão no formato esperado.");
        }
      } catch (error) {
        console.error("Erro ao analisar os dados de produtos do localStorage:", error);
      }
    }

    if (servicosData) {
      try {
        const parsedServicos = JSON.parse(servicosData);
        if (Array.isArray(parsedServicos)) {
          setServicos(parsedServicos);
        } else {
          console.error("Os dados de serviços no localStorage não estão no formato esperado.");
        }
      } catch (error) {
        console.error("Erro ao analisar os dados de serviços do localStorage:", error);
      }
    }
  }, []);

  const toggleProdutoDropdown = (index: number) => {
    setExpandedProdutoIndex(prevIndex => (prevIndex === index ? null : index));
    setExpandedServicoIndex(null); // fecha qualquer serviço aberto
  };

  const toggleServicoDropdown = (index: number) => {
    setExpandedServicoIndex(prevIndex => (prevIndex === index ? null : index));
    setExpandedProdutoIndex(null); // fecha qualquer produto aberto
  };

  const deleteProduto = (nomeprod: string) => {
    const updatedProdutos = produtos.filter(produto => produto.nomeprod !== nomeprod);
    setProdutos(updatedProdutos);
    localStorage.setItem("produtos", JSON.stringify(updatedProdutos));
  };

  const deleteServico = (nomeserv: string) => {
    const updatedServicos = servicos.filter(servico => servico.nomeserv !== nomeserv);
    setServicos(updatedServicos);
    localStorage.setItem("servicos", JSON.stringify(updatedServicos));
  };

  const enableEditProduto = (produto: Produto, index: number) => {
    setEditIndex(index);
    setEditingProduto({ ...produto });
  };

  const enableEditServico = (servico: Servico, index: number) => {
    setEditIndex(index);
    setEditingServico({ ...servico });
  };

  const saveEditProduto = () => {
    if (editingProduto && editIndex !== null) {
      const updatedProdutos = [...produtos];
      updatedProdutos[editIndex] = editingProduto;
      setProdutos(updatedProdutos);
      setEditIndex(null);
      setEditingProduto(null);
      localStorage.setItem("produtos", JSON.stringify(updatedProdutos));
    }
  };

  const saveEditServico = () => {
    if (editingServico && editIndex !== null) {
      const updatedServicos = [...servicos];
      updatedServicos[editIndex] = editingServico;
      setServicos(updatedServicos);
      setEditIndex(null);
      setEditingServico(null);
      localStorage.setItem("servicos", JSON.stringify(updatedServicos));
    }
  };

  const handleChangeProduto = (field: string, value: string | number) => {
    if (editingProduto) {
      setEditingProduto(prev => ({
        ...prev!,
        [field]: field === "valorprod" ? Number(value) : value
      }));
    }
  };

  const handleChangeServico = (field: string, value: string | number) => {
    if (editingServico) {
      setEditingServico(prev => ({
        ...prev!,
        [field]: field === "valorserv" ? Number(value) : value
      }));
    }
  };

  return (
    <div className="container-fluid">
      <div className="list-group">
        {produtos.length > 0 && (
          <div>
            <h3>Produtos</h3>
            {produtos.map((produto, index) => (
              <div key={index}>
                <a
                  href="#"
                  className="list-group-item list-group-item-action"
                  style={{ backgroundColor: tema }}
                  onClick={() => toggleProdutoDropdown(index)}
                >
                  {produto.nomeprod}
                </a>
                {expandedProdutoIndex === index && (
                  <div className="dropdown-content">
                    {editIndex !== index && (
                      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <button className="btn btn-danger" onClick={() => deleteProduto(produto.nomeprod)}>
                          Deletar
                        </button>
                        <button className="btn btn-info" onClick={() => enableEditProduto(produto, index)}>
                          Atualizar
                        </button>
                      </div>
                    )}
                    {editIndex === index && editingProduto ? (
                      <div>
                        <input
                          type="text"
                          className="inputscadastroproduto2"
                          value={editingProduto.nomeprod}
                          onChange={(e) => handleChangeProduto("nomeprod", e.target.value)}
                        />
                        <input
                          type="number"
                          className="inputscadastroproduto2"
                          value={editingProduto.valorprod}
                          onChange={(e) => handleChangeProduto("valorprod", e.target.value)}
                        />
                        <input
                          type="text"
                          className="inputscadastroproduto2"
                          value={editingProduto.tipoprod}
                          onChange={(e) => handleChangeProduto("tipoprod", e.target.value)}
                        />
                        <input
                          type="text"
                          className="inputscadastroproduto2"
                          value={editingProduto.descricaoprod}
                          onChange={(e) => handleChangeProduto("descricaoprod", e.target.value)}
                        />
                        <button className="btn btn-success" onClick={saveEditProduto}>
                          Salvar
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p><strong>Valor:</strong> R${produto.valorprod}</p>
                        <p><strong>Tipo:</strong> {produto.tipoprod}</p>
                        <p><strong>Descrição:</strong> {produto.descricaoprod}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {servicos.length > 0 && (
          <div>
            <h3>Serviços</h3>
            {servicos.map((servico, index) => (
              <div key={index}>
                <a
                  href="#"
                  className="list-group-item list-group-item-action"
                  style={{ backgroundColor: tema }}
                  onClick={() => toggleServicoDropdown(index)}
                >
                  {servico.nomeserv}
                </a>
                {expandedServicoIndex === index && (
                  <div className="dropdown-content">
                    {editIndex !== index && (
                      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <button className="btn btn-danger" onClick={() => deleteServico(servico.nomeserv)}>
                          Deletar
                        </button>
                        <button className="btn btn-info" onClick={() => enableEditServico(servico, index)}>
                          Atualizar
                        </button>
                      </div>
                    )}
                    {editIndex === index && editingServico ? (
                      <div>
                        <input
                          type="text"
                          className="inputscadastroproduto2"
                          value={editingServico.nomeserv}
                          onChange={(e) => handleChangeServico("nomeserv", e.target.value)}
                        />
                        <input
                          type="number"
                          className="inputscadastroproduto2"
                          value={editingServico.valorserv}
                          onChange={(e) => handleChangeServico("valorserv", e.target.value)}
                        />
                        <input
                          type="text"
                          className="inputscadastroproduto2"
                          value={editingServico.tiposerv}
                          onChange={(e) => handleChangeServico("tiposerv", e.target.value)}
                        />
                        <input
                          type="text"
                          className="inputscadastroproduto2"
                          value={editingServico.descricaoserv}
                          onChange={(e) => handleChangeServico("descricaoserv", e.target.value)}
                        />
                        <button className="btn btn-success" onClick={saveEditServico}>
                          Salvar
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p><strong>Valor:</strong> R${servico.valorserv}</p>
                        <p><strong>Tipo:</strong> {servico.tiposerv}</p>
                        <p><strong>Descrição:</strong> {servico.descricaoserv}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaProdutosServicos;
