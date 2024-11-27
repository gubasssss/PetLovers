import React, { Component } from 'react';

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

interface State {
    showProdutoForm: boolean;
    showServicoForm: boolean;
    produto: Produto;
    servico: Servico;
}

class CadastroPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showProdutoForm: false,
            showServicoForm: false,
            produto: { nomeprod: '', valorprod: 0, tipoprod: '', descricaoprod: '' },
            servico: { nomeserv: '', valorserv: 0, tiposerv: '', descricaoserv: '' }
        };
    }

    handleCadastroProduto = () => {
        this.setState({ showProdutoForm: true, showServicoForm: false });
    };

    handleCadastroServico = () => {
        this.setState({ showServicoForm: true, showProdutoForm: false });
    };

    handleProdutoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            produto: {
                ...prevState.produto,
                [name]: value
            }
        }));
    };

    handleServicoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            servico: {
                ...prevState.servico,
                [name]: value
            }
        }));
    };

    saveProduto = (e: React.FormEvent) => {
        e.preventDefault();
        const { produto } = this.state;

        if (!produto.nomeprod || !produto.valorprod || !produto.tipoprod || !produto.descricaoprod) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        const produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        alert('Produto cadastrado com sucesso!');
        this.setState({
            produto: { nomeprod: '', valorprod: 0, tipoprod: '', descricaoprod: '' }
        });
    };

    saveServico = (e: React.FormEvent) => {
        e.preventDefault();
        const { servico } = this.state;

        if (!servico.nomeserv || !servico.valorserv || !servico.tiposerv || !servico.descricaoserv) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        const servicos = JSON.parse(localStorage.getItem('servicos') || '[]');
        servicos.push(servico);
        localStorage.setItem('servicos', JSON.stringify(servicos));
        alert('Serviço cadastrado com sucesso!');
        this.setState({
            servico: { nomeserv: '', valorserv: 0, tiposerv: '', descricaoserv: '' }
        });
    };

    render() {
        const { showProdutoForm, showServicoForm, produto, servico } = this.state;

        return (
            <div className="container">
                {/* Botões para exibir os formulários */}
                <div style={{ marginLeft: -200 }}>
                    <button className="btn btn-secondary" onClick={this.handleCadastroProduto}>
                        Cadastrar Produto
                    </button>
                </div>
                <div style={{ marginTop: -42, marginLeft: 200 }}>
                    <button className="btn btn-secondary" onClick={this.handleCadastroServico}>
                        Cadastrar Serviço
                    </button>
                </div>

                {/* Formulário de cadastro de produto */}
                {showProdutoForm && (
                    <div className="form-container">
                        <h2>Cadastro de Produto</h2>
                        <form onSubmit={this.saveProduto}>
                            <div>
                                <input
                                    type="text"
                                    name="nomeprod"
                                    className="inputscadastroproduto"
                                    value={produto.nomeprod}
                                    onChange={this.handleProdutoChange}
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
                                    onChange={this.handleProdutoChange}
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
                                    onChange={this.handleProdutoChange}
                                    placeholder="Tipo do produto"
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    name="descricaoprod"
                                    className="inputscadastroproduto"
                                    value={produto.descricaoprod}
                                    onChange={this.handleProdutoChange}
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
                        <form onSubmit={this.saveServico}>
                            <div>
                                <input
                                    type="text"
                                    name="nomeserv"
                                    className="inputscadastroservico"
                                    value={servico.nomeserv}
                                    onChange={this.handleServicoChange}
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
                                    onChange={this.handleServicoChange}
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
                                    onChange={this.handleServicoChange}
                                    placeholder="Tipo do serviço"
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    name="descricaoserv"
                                    className="inputscadastroservico"
                                    value={servico.descricaoserv}
                                    onChange={this.handleServicoChange}
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
    }
}

export default CadastroPage;
