import { Component } from "react";
import { insertMaskInCpf } from "../functions/cpf";

type props = {
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

type Compra = {
    clienteCpf: string;
    itemNome: string;
    valorCompra: number;
    tipoItem: string;  // "produto" ou "serviço"
};

type State = {
    produtos: Produto[];
    servicos: Servico[];
    compra: Compra | null;
    selectedItem: Produto | Servico | null;
    cpfCliente: string;
    tipoItem: "produto" | "servico";
};

export default class CadastroCompra extends Component<props, State> {
    state: State = {
        produtos: [],
        servicos: [],
        compra: null,
        selectedItem: null,
        cpfCliente: "",  // CPF do cliente
        tipoItem: "produto",  // Define se o item é produto ou serviço
    };

    componentDidMount() {
        // Carrega os produtos e serviços do localStorage
        const produtos = localStorage.getItem("produtos");
        const servicos = localStorage.getItem("servicos");

        if (produtos) {
            try {
                const parsedProdutos = JSON.parse(produtos);
                if (Array.isArray(parsedProdutos)) {
                    this.setState({ produtos: parsedProdutos });
                }
            } catch (error) {
                console.error("Erro ao analisar os produtos:", error);
            }
        }

        if (servicos) {
            try {
                const parsedServicos = JSON.parse(servicos);
                if (Array.isArray(parsedServicos)) {
                    this.setState({ servicos: parsedServicos });
                }
            } catch (error) {
                console.error("Erro ao analisar os serviços:", error);
            }
        }
    }

    // Função para diferenciar Produto de Servico
    isProduto(item: Produto | Servico): item is Produto {
        return (item as Produto).nomeprod !== undefined;
    }

    handleSelectItem = (item: Produto | Servico) => {
        this.setState({ selectedItem: item });
    };

    handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cpfComMascara = insertMaskInCpf(e.target.value); // Aplica a máscara ao CPF
        this.setState({ cpfCliente: cpfComMascara }); // Atualiza o estado com o CPF formatado
    };
    

    handleTipoItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ tipoItem: e.target.value as "produto" | "servico" });
    };

    handleCadastrarCompra = () => {
        const { selectedItem, cpfCliente, tipoItem } = this.state;
    
        // Verifica se o CPF está cadastrado
        const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
        const clienteExistente = clientes.find((cliente: any) => cliente.cpf.valor === cpfCliente);  // A propriedade 'cpf.valor' deve ser usada aqui
    
        if (!clienteExistente) {
            alert("CPF não cadastrado! Por favor, registre o cliente antes de realizar a compra.");
            return; // Impede o cadastro da compra se o CPF não for encontrado
        }
    
        // Se o CPF foi encontrado, então prossegue para registrar a compra
        if (selectedItem && cpfCliente) {
            const itemNome = this.isProduto(selectedItem)
                ? selectedItem.nomeprod
                : selectedItem.nomeserv;
    
            const valorCompra = this.isProduto(selectedItem)
                ? selectedItem.valorprod
                : selectedItem.valorserv;
    
            const novaCompra: Compra = {
                clienteCpf: cpfCliente,
                itemNome: itemNome,
                valorCompra: valorCompra,
                tipoItem,
            };
    
            // Adiciona a compra na lista de compras do cliente
            clienteExistente.compras.push(novaCompra);
    
            // Atualiza o cliente no localStorage
            const updatedClientes = clientes.map((cliente: any) =>
                cliente.cpf.valor === cpfCliente ? clienteExistente : cliente
            );
            localStorage.setItem("clientes", JSON.stringify(updatedClientes));
    
            // Reseta o estado após a compra ser cadastrada
            this.setState({
                compra: novaCompra,
                selectedItem: null,
                cpfCliente: "",
                tipoItem: "produto",
            });
    
            alert("Compra registrada com sucesso!");
        } else {
            alert("Por favor, preencha todos os campos!");
        }
    };
    
    

    render() {
        const { tema } = this.props;
        const { produtos, servicos, selectedItem, cpfCliente, tipoItem } = this.state;

        return (
            <div className="container-fluid">
                <div className="form-group">
                    <label htmlFor="cpfCliente"></label>
                    <input
                        type="text"
                        id="cpfCliente"
                        className="inputscadastrocliente2"                        
                        value={cpfCliente}
                        onChange={this.handleCpfChange}
                        placeholder="Digite o CPF do cliente"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tipoItem"></label>
                    <select
                        id="tipoItem"
                        className="inputscadastrocliente2"                        
                        value={tipoItem}
                        onChange={this.handleTipoItemChange}
                    >   
                        <option value="">Selecionar o tipo do produto</option>
                        <option value="produto">Produto</option>
                        <option value="servico">Serviço</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="itemSelect">
                    </label>
                    <select
                        id="itemSelect"
                        className="inputscadastrocliente2"                        
                        onChange={(e) => {
                            const selected =
                                tipoItem === "produto"
                                    ? produtos.find((produto) => produto.nomeprod === e.target.value)
                                    : servicos.find((servico) => servico.nomeserv === e.target.value);

                            if (selected) {
                                this.handleSelectItem(selected);
                            }
                        }}
                    >
                        <option value="">Selecione um {tipoItem === "produto" ? "produto" : "serviço"}</option>
                        {(tipoItem === "produto" ? produtos : servicos).map((item, index) => (
                            <option key={index} value={this.isProduto(item) ? item.nomeprod : item.nomeserv}>
                                {this.isProduto(item) ? item.nomeprod : item.nomeserv}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedItem && (
                    <div className="item-info">
                        <h4>{tipoItem === "produto" ? "Produto Selecionado" : "Serviço Selecionado"}</h4>
                        <p><strong>Nome:</strong> {this.isProduto(selectedItem) ? selectedItem.nomeprod : selectedItem.nomeserv}</p>
                        <p><strong>Valor:</strong> R$ {this.isProduto(selectedItem) ? selectedItem.valorprod : selectedItem.valorserv}</p>
                        <p><strong>Tipo:</strong> {this.isProduto(selectedItem) ? selectedItem.tipoprod : selectedItem.tiposerv}</p>
                        <p><strong>Descrição:</strong> {this.isProduto(selectedItem) ? selectedItem.descricaoprod : selectedItem.descricaoserv}</p>
                    </div>
                )}

                <button className="btn btn-primary" onClick={this.handleCadastrarCompra}>
                    Cadastrar Compra
                </button>

                {this.state.compra && (
                    <div className="alert alert-success mt-3">
                        <p><strong>Compra realizada com sucesso!</strong></p>
                        <p><strong>{this.state.tipoItem === "produto" ? "Produto" : "Serviço"}:</strong> {this.state.compra.itemNome}</p>
                        <p><strong>Valor:</strong> R${this.state.compra.valorCompra}</p>
                    </div>
                )}
            </div>
        );
    }
}
