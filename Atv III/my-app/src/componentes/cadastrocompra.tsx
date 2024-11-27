import React, { useState, useEffect } from "react";
import { insertMaskInCpf } from "../functions/cpf";

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
    tipoItem: string; // "produto" ou "serviço"
};

type Props = {
    tema: string;
};

const CadastroCompra: React.FC<Props> = ({ tema }) => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [compra, setCompra] = useState<Compra | null>(null);
    const [selectedItem, setSelectedItem] = useState<Produto | Servico | null>(null);
    const [cpfCliente, setCpfCliente] = useState<string>("");
    const [tipoItem, setTipoItem] = useState<"produto" | "servico">("produto");

    useEffect(() => {
        // Carrega os produtos e serviços do localStorage
        const produtos = localStorage.getItem("produtos");
        const servicos = localStorage.getItem("servicos");

        if (produtos) {
            try {
                const parsedProdutos = JSON.parse(produtos);
                if (Array.isArray(parsedProdutos)) {
                    setProdutos(parsedProdutos);
                }
            } catch (error) {
                console.error("Erro ao analisar os produtos:", error);
            }
        }

        if (servicos) {
            try {
                const parsedServicos = JSON.parse(servicos);
                if (Array.isArray(parsedServicos)) {
                    setServicos(parsedServicos);
                }
            } catch (error) {
                console.error("Erro ao analisar os serviços:", error);
            }
        }
    }, []);

    // Função para diferenciar Produto de Servico
    const isProduto = (item: Produto | Servico): item is Produto => {
        return (item as Produto).nomeprod !== undefined;
    };

    const handleSelectItem = (item: Produto | Servico) => {
        setSelectedItem(item);
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cpfComMascara = insertMaskInCpf(e.target.value); // Aplica a máscara ao CPF
        setCpfCliente(cpfComMascara); // Atualiza o estado com o CPF formatado
    };

    const handleTipoItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoItem(e.target.value as "produto" | "servico");
    };

    const handleCadastrarCompra = () => {
        // Verifica se o CPF está cadastrado
        const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
        const clienteExistente = clientes.find((cliente: any) => cliente.cpf.valor === cpfCliente);  // A propriedade 'cpf.valor' deve ser usada aqui

        if (!clienteExistente) {
            alert("CPF não cadastrado! Por favor, registre o cliente antes de realizar a compra.");
            return; // Impede o cadastro da compra se o CPF não for encontrado
        }

        // Se o CPF foi encontrado, então prossegue para registrar a compra
        if (selectedItem && cpfCliente) {
            const itemNome = isProduto(selectedItem)
                ? selectedItem.nomeprod
                : selectedItem.nomeserv;

            const valorCompra = isProduto(selectedItem)
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
            setCompra(novaCompra);
            setSelectedItem(null);
            setCpfCliente("");
            setTipoItem("produto");

            alert("Compra registrada com sucesso!");
        } else {
            alert("Por favor, preencha todos os campos!");
        }
    };

    return (
        <div className="container-fluid">
            <div className="form-group">
                <label htmlFor="cpfCliente"></label>
                <input
                    type="text"
                    id="cpfCliente"
                    className="inputscadastrocliente2"
                    value={cpfCliente}
                    onChange={handleCpfChange}
                    placeholder="Digite o CPF do cliente"
                />
            </div>

            <div className="form-group">
                <label htmlFor="tipoItem"></label>
                <select
                    id="tipoItem"
                    className="inputscadastrocliente2"
                    value={tipoItem}
                    onChange={handleTipoItemChange}
                >
                    <option value="">Selecionar o tipo do produto</option>
                    <option value="produto">Produto</option>
                    <option value="servico">Serviço</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="itemSelect"></label>
                <select
                    id="itemSelect"
                    className="inputscadastrocliente2"
                    onChange={(e) => {
                        const selected =
                            tipoItem === "produto"
                                ? produtos.find((produto) => produto.nomeprod === e.target.value)
                                : servicos.find((servico) => servico.nomeserv === e.target.value);

                        if (selected) {
                            handleSelectItem(selected);
                        }
                    }}
                >
                    <option value="">Selecione um {tipoItem === "produto" ? "produto" : "serviço"}</option>
                    {(tipoItem === "produto" ? produtos : servicos).map((item, index) => (
                        <option key={index} value={isProduto(item) ? item.nomeprod : item.nomeserv}>
                            {isProduto(item) ? item.nomeprod : item.nomeserv}
                        </option>
                    ))}
                </select>
            </div>

            {selectedItem && (
                <div className="item-info">
                    <h4>{tipoItem === "produto" ? "Produto Selecionado" : "Serviço Selecionado"}</h4>
                    <p><strong>Nome:</strong> {isProduto(selectedItem) ? selectedItem.nomeprod : selectedItem.nomeserv}</p>
                    <p><strong>Valor:</strong> R$ {isProduto(selectedItem) ? selectedItem.valorprod : selectedItem.valorserv}</p>
                    <p><strong>Tipo:</strong> {isProduto(selectedItem) ? selectedItem.tipoprod : selectedItem.tiposerv}</p>
                    <p><strong>Descrição:</strong> {isProduto(selectedItem) ? selectedItem.descricaoprod : selectedItem.descricaoserv}</p>
                </div>
            )}

            <button className="btn btn-primary" onClick={handleCadastrarCompra}>
                Cadastrar Compra
            </button>

            {compra && (
                <div className="alert alert-success mt-3">
                    <p><strong>Compra realizada com sucesso!</strong></p>
                    <p><strong>{compra.tipoItem === "produto" ? "Produto" : "Serviço"}:</strong> {compra.itemNome}</p>
                    <p><strong>Valor:</strong> R${compra.valorCompra}</p>
                </div>
            )}
        </div>
    );
};

export default CadastroCompra;
