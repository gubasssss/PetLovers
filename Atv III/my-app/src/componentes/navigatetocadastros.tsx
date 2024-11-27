import React, { useState } from 'react';

type Props = {
    tema: string;
};

interface Produto {
    nomeprod: string;
    valorprod: number;
    tipoprod: string;
    descricaoprod: string;
}

interface Servico {
    nomeserv: string;
    valorserv: number;
    tiposerv: string;
    descricaoserv: string;
}

const CadastroPage: React.FC<Props> = ({ tema }) => {
    const [showProdutoForm, setShowProdutoForm] = useState(false);
    const [showServicoForm, setShowServicoForm] = useState(false);

    // Estado para armazenar os dados dos produtos e serviços
    const [produto, setProduto] = useState<Produto>({ nomeprod: '', valorprod: 0, tipoprod: '', descricaoprod: '' });
    const [servico, setServico] = useState<Servico>({ nomeserv: '', valorserv: 0, tiposerv: '', descricaoserv: '' });

    const handleCadastroProduto = () => {
        setShowProdutoForm(true);
        setShowServicoForm(false);
    };

    const handleCadastroServico = () => {
        setShowServicoForm(true);
        setShowProdutoForm(false);
    };

    // Função para lidar com a mudança nos campos de produto
    const handleProdutoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduto((prevProduto) => ({
            ...prevProduto,
            [name]: value,
        }));
    };

    // Função para lidar com a mudança nos campos de serviço
    const handleServicoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setServico((prevServico) => ({
            ...prevServico,
            [name]: value,
        }));
    };

    // Função para salvar produto no localStorage
    const saveProduto = (e: React.FormEvent) => {
        e.preventDefault();

        if (!produto.nomeprod || !produto.valorprod || !produto.tipoprod || !produto.descricaoprod) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        alert('Produto cadastrado com sucesso!');
        setProduto({ nomeprod: '', valorprod: 0, tipoprod: '', descricaoprod: '' });
    };

    // Função para salvar serviço no localStorage
    const saveServico = (e: React.FormEvent) => {
        e.preventDefault();

        if (!servico.nomeserv || !servico.valorserv || !servico.tiposerv || !servico.descricaoserv) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        const servicos = JSON.parse(localStorage.getItem('servicos') || '[]');
        servicos.push(servico);
        localStorage.setItem('servicos', JSON.stringify(servicos));
        alert('Serviço cadastrado com sucesso!');
        setServico({ nomeserv: '', valorserv: 0, tiposerv: '', descricaoserv: '' });
    };

    return (
        <div className="container">
            {/* Botões para exibir os formulários */}
            <div style={{ marginLeft: -200 }}>
                <button className="btn btn-secondary" onClick={handleCadastroProduto}>
                    Cadastrar Produto
                </button>
            </div>
            <div style={{ marginTop: -42, marginLeft: 200 }}>
                <button className="btn btn-secondary" onClick={handleCadastroServico}>
                    Cadastrar Serviço
                </button>
            </div>

            {/* Formulário de cadastro de produto */}
            {showProdutoForm && (
                <div className="form-container">
                    <h2>Cadastro de Produto</h2>
                    <form onSubmit={saveProduto}>
                        <div>
                            <input
                                type="text"
                                name="nomeprod"
                                className="inputscadastroproduto"
                                value={produto.nomeprod}
                                onChange={handleProdutoChange}
                                placeholder="Nome do produto"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                className="inputscadastroproduto"
                                name="valorprod"
                                value={produto.valorprod}
                                onChange={handleProdutoChange}
                                placeholder="Valor"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="tipoprod"
                                className="inputscadastroproduto"
                                value={produto.tipoprod}
                                onChange={handleProdutoChange}
                                placeholder="Tipo do produto"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                name="descricaoprod"
                                className="inputscadastroproduto"
                                value={produto.descricaoprod}
                                onChange={handleProdutoChange}
                                placeholder="Descrição do produto"
                                required
                            />
                        </div>
                        <button className="btn btn-primary" type="submit">Cadastrar Produto</button>
                    </form>
                </div>
            )}

            {/* Formulário de cadastro de serviço */}
            {showServicoForm && (
                <div className="form-container">
                    <h2>Cadastro de Serviço</h2>
                    <form onSubmit={saveServico}>
                        <div>
                            <input
                                type="text"
                                name="nomeserv"
                                className="inputscadastroservico"
                                value={servico.nomeserv}
                                onChange={handleServicoChange}
                                placeholder="Nome do serviço"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                name="valorserv"
                                className="inputscadastroservico"
                                value={servico.valorserv}
                                onChange={handleServicoChange}
                                placeholder="Preço"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="tiposerv"
                                className="inputscadastroservico"
                                value={servico.tiposerv}
                                onChange={handleServicoChange}
                                placeholder="Tipo do serviço"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                name="descricaoserv"
                                className="inputscadastroservico"
                                value={servico.descricaoserv}
                                onChange={handleServicoChange}
                                placeholder="Descrição do serviço"
                                required
                            />
                        </div>
                        <button className="btn btn-primary" type="submit">Cadastrar Serviço</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CadastroPage;
