import { Component } from "react";

type props = {
    tema: string;
};

type Cliente = {
    nome: string;
    nomeSocial?: string;
    email: string;
    telefone: { numero: string };
    cpf: { valor: string };
    rg: { valor: string };
    pet: Pet[];
    compras: Compra[];
};

type Compra = {
    itemNome: string;
    valorCompra: number;
    tipoItem: "produto" | "serviço";
};

type Pet = {
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
};

type State = {
    clientes: Cliente[];
    showTopClientes: boolean;
    showTopItens: boolean;
    showTopItensPorPet: boolean;
    showTopRacaPorPet: boolean;
    showTopClientesPorValor: boolean;
    topItens: { nome: string; quantidade: number }[];
    topItensPorPet: { tipoPet: string; itens: { nome: string; quantidade: number }[] }[];
    topItensPorRaca: { raca: string; itens: { nome: string; quantidade: number }[] }[];
    topClientesPorValor: { nome: string; totalGasto: number }[];
};

export default class Listas extends Component<props, State> {
    state: State = {
        clientes: [],
        showTopClientes: false,
        showTopItens: false,
        showTopItensPorPet: false,
        showTopRacaPorPet: false,
        showTopClientesPorValor: false,
        topItens: [],
        topItensPorPet: [],
        topItensPorRaca: [],
        topClientesPorValor: [],
    };

    componentDidMount() {
        const clientes = localStorage.getItem("clientes");
        if (clientes) {
            try {
                const parsedClientes: Cliente[] = JSON.parse(clientes);
                if (Array.isArray(parsedClientes)) {
                    this.setState({ clientes: parsedClientes });
                }
            } catch (error) {
                console.error("Erro ao analisar os dados do localStorage:", error);
            }
        }
    }

getTopClientesPorValor = (): { nome: string; totalGasto: number }[] => {
    return this.state.clientes
        .map((cliente) => ({
            nome: cliente.nome,
            totalGasto: (cliente.compras || []).reduce(
                (total, compra) => total + (Number(compra.valorCompra) || 0),
                0
            ),
        }))
        .sort((a, b) => b.totalGasto - a.totalGasto)
        .slice(0, 5);
};

    getTopItensPorRaca = (): { raca: string; itens: { nome: string; quantidade: number }[] }[] => {
        const racaItemCounts: { [key: string]: { [item: string]: number } } = {};

        this.state.clientes.forEach((cliente) => {
            cliente.pet.forEach((pet) => {
                if (!racaItemCounts[pet.raca]) {
                    racaItemCounts[pet.raca] = {};
                }
                cliente.compras.forEach((compra) => {
                    const nomeItem = compra.itemNome;
                    racaItemCounts[pet.raca][nomeItem] =
                        (racaItemCounts[pet.raca][nomeItem] || 0) + 1;
                });
            });
        });

        return Object.entries(racaItemCounts).map(([raca, itens]) => ({
            raca,
            itens: Object.entries(itens)
                .map(([nome, quantidade]) => ({ nome, quantidade }))
                .sort((a, b) => b.quantidade - a.quantidade),
        }));
    };

    getTopClientes = (clientes: Cliente[]): Cliente[] => {
        return clientes
            .sort((a, b) => b.compras.length - a.compras.length)
            .slice(0, 10);
    };

    getTopItens = (): { nome: string; quantidade: number }[] => {
        const itemCounts: { [key: string]: number } = {};
        this.state.clientes.forEach((cliente) => {
            cliente.compras.forEach((compra) => {
                const nomeItem = compra.itemNome;
                itemCounts[nomeItem] = (itemCounts[nomeItem] || 0) + 1;
            });
        });

        return Object.entries(itemCounts)
            .map(([nome, quantidade]) => ({ nome, quantidade }))
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, 5);
    };

    getTopItensPorTipoDePet = (): { tipoPet: string; itens: { nome: string; quantidade: number }[] }[] => {
        const petItemCounts: { [key: string]: { [item: string]: number } } = {};

        this.state.clientes.forEach((cliente) => {
            cliente.pet.forEach((pet) => {
                if (!petItemCounts[pet.genero]) {
                    petItemCounts[pet.genero] = {};
                }
                cliente.compras.forEach((compra) => {
                    const nomeItem = compra.itemNome;
                    petItemCounts[pet.genero][nomeItem] =
                        (petItemCounts[pet.genero][nomeItem] || 0) + 1;
                });
            });
        });

        return Object.entries(petItemCounts).map(([tipoPet, itens]) => ({
            tipoPet,
            itens: Object.entries(itens)
                .map(([nome, quantidade]) => ({ nome, quantidade }))
                .sort((a, b) => b.quantidade - a.quantidade),
        }));
    };

    toggleShowTopClientes = () => {
        this.setState((prevState) => ({
            showTopClientes: !prevState.showTopClientes,
            showTopItens: false,
            showTopItensPorPet: false,
            showTopRacaPorPet: false,
        }));
    };

    toggleShowTopItens = () => {
        const topItens = this.getTopItens();
        this.setState((prevState) => ({
            showTopItens: !prevState.showTopItens,
            showTopClientes: false,
            showTopItensPorPet: false,
            showTopRacaPorPet: false,
            topItens,
        }));
    };

    toggleShowTopItensPorPet = () => {
        const topItensPorPet = this.getTopItensPorTipoDePet();
        this.setState((prevState) => ({
            showTopItensPorPet: !prevState.showTopItensPorPet,
            showTopClientes: false,
            showTopItens: false,
            showTopRacaPorPet: false,
            topItensPorPet,
        }));
    };

    toggleShowTopItensPorRaca = () => {
        const topItensPorRaca = this.getTopItensPorRaca();
        this.setState((prevState) => ({
            showTopRacaPorPet: !prevState.showTopRacaPorPet,
            showTopClientes: false,
            showTopItens: false,
            showTopItensPorPet: false,
            topItensPorRaca,
        }));
    };

    toggleShowTopClientesPorValor = () => {
        const topClientesPorValor = this.getTopClientesPorValor();
        this.setState((prevState) => ({
            showTopClientesPorValor: !prevState.showTopClientesPorValor,
            showTopClientes: false,
            showTopItens: false,
            showTopItensPorPet: false,
            showTopRacaPorPet: false,
            topClientesPorValor,
        }));
    };
    
    

    render() {
        const { tema } = this.props;
        const topClientes = this.getTopClientes(this.state.clientes);
        const { showTopClientes, showTopItens, showTopItensPorPet, showTopRacaPorPet, topItens, topItensPorPet, topItensPorRaca,topClientesPorValor,showTopClientesPorValor } =
        this.state

        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                {/* Botões de exibição (aparecem somente se nenhuma lista está visível) */}
                {!showTopClientes && !showTopItens && !showTopItensPorPet && !showTopRacaPorPet && !showTopClientesPorValor && (
                    <>
                        <button
                            className="btn btn-primary"
                            onClick={this.toggleShowTopClientes}
                            style={{
                                padding: "10px 20px",
                                fontSize: "16px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginBottom: "20px",
                            }}
                        >
                            Ver Top 10 Clientes
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={this.toggleShowTopItens}
                            style={{
                                padding: "10px 20px",
                                fontSize: "16px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginBottom: "20px",
                                marginLeft: "20px",
                            }}
                        >
                            Ver Top 5 Itens Consumidos
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={this.toggleShowTopItensPorPet}
                            style={{
                                padding: "10px 20px",
                                fontSize: "16px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginBottom: "20px",
                                marginLeft: "20px",
                            }}
                        >
                            Ver Itens por Tipo de Pet
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={this.toggleShowTopItensPorRaca}
                            style={{
                                padding: "10px 20px",
                                fontSize: "16px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginBottom: "20px",
                                marginLeft: "20px",
                            }}
                        >
                            Ver Itens por Raça de Pet
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={this.toggleShowTopClientesPorValor}
                            style={{
                                padding: "10px 20px",
                                fontSize: "16px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginBottom: "20px",
                                marginLeft: "20px",
                            }}
                        >
                            Ver Top 5 Itens Valor
                            </button>
                    </>
                )}

                 {/* Lista de Itens por Raça de Pet */}
                 {showTopRacaPorPet && (
                    <div style={{ marginTop: "20px" }}>
                        <h2 style={{ color: tema }}>Itens Mais Consumidos por Raça de Pet</h2>
                        {topItensPorRaca.map((raca, index) => (
                            <div
                                key={index}
                                style={{
                                    margin: "20px 0",
                                    padding: "15px",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <h3 style={{ textDecoration: "underline", marginBottom: "10px" }}>
                                    Raça: {raca.raca}
                                </h3>
                                <ul style={{ listStyleType: "none", padding: 0 }}>
                                    {raca.itens.map((item, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                margin: "10px 0",
                                                padding: "10px",
                                                borderRadius: "6px",
                                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                            }}
                                        >
                                            <p>
                                                <strong>Item:</strong> {item.nome}
                                            </p>
                                            <p>
                                                <strong>Quantidade Consumida:</strong> {item.quantidade}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <button
                            className="btn btn-secondary"
                            onClick={this.toggleShowTopItensPorRaca}
                            style={{
                                padding: "10px 20px",
                                fontSize: "16px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginTop: "20px",
                            }}
                        >
                            Fechar Lista de Itens por Raça de Pet
                        </button>
                    </div>
                )}

{showTopClientesPorValor && (
                <div style={{ marginTop: "20px" }}>
                    <h2 style={{ color: tema }}>Top 5 Clientes que Mais Gastaram</h2>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {topClientesPorValor.map((cliente, index) => (
                            <li
                                key={index}
                                style={{
                                    margin: "10px 0",
                                    padding: "15px",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <p>
                                    <strong>Nome:</strong> {cliente.nome}
                                </p>
                                <p>
                                    <strong>Total Gasto:</strong> R$ {cliente.totalGasto.toFixed(2)}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="btn btn-secondary"
                        onClick={this.toggleShowTopClientesPorValor}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "20px",
                        }}
                    >
                        Fechar Lista de Clientes por Valor
                    </button>
                </div>
            )}


                {/* Lista de Top Clientes */}
                {showTopClientes && (
                    <div style={{ marginTop: "20px" }}>
                        <h2 style={{ color: tema }}>Top 10 Clientes que Mais Consumiram</h2>
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {topClientes.map((cliente, index) => (
                                <li
                                    key={index}
                                    style={{
                                        margin: "10px 0",
                                        padding: "15px",
                                        borderRadius: "8px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <p>
                                        <strong>Nome:</strong> {cliente.nome}
                                    </p>
                                    <p>
                                        <strong>Compras:</strong> {cliente.compras.length} itens
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="btn btn-secondary"
                            onClick={this.toggleShowTopClientes}
                            style={{
                                padding: "10px 20px",
                                fontSize: "16px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginTop: "20px",
                            }}
                        >
                            Fechar Lista de Clientes
                        </button>
                    </div>
                )}

                {/* Lista de Top Itens */}
                {showTopItens && (
                    <div style={{ marginTop: "20px" }}>
                        <h2 style={{ color: tema }}>Top 5 Itens Mais Consumidos</h2>
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {topItens.map((item, index) => (
                                <li
                                    key={index}
                                    style={{
                                        margin: "10px 0",
                                        padding: "15px",
                                        borderRadius: "8px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <p>
                                        <strong>Item:</strong> {item.nome}
                                    </p>
                                    <p>
                                        <strong>Quantidade Consumida:</strong> {item.quantidade}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="btn btn-secondary"
                            onClick={this.toggleShowTopItens}
                            style={{
                                padding: "10px 20px",
                                fontSize: "16px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginTop: "20px",
                            }}
                        >
                            Fechar Lista de Itens
                        </button>
                    </div>
                )}

                {/* Lista de Itens por Tipo de Pet */}
                {showTopItensPorPet && (
                    <div style={{ marginTop: "20px" }}>
                        <h2 style={{ color: tema }}>Itens Mais Consumidos por Tipo de Pet</h2>
                        {topItensPorPet.map((tipo, index) => (
                            <div
                                key={index}
                                style={{
                                    margin: "20px 0",
                                    padding: "15px",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <h3 style={{ textDecoration: "underline", marginBottom: "10px" }}>
                                    Tipo de Pet: {tipo.tipoPet}
                                </h3>
                                <ul style={{ listStyleType: "none", padding: 0 }}>
                                    {tipo.itens.map((item, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                margin: "10px 0",
                                                padding: "10px",
                                                borderRadius: "6px",
                                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                            }}
                                        >
                                            <p>
                                                <strong>Item:</strong> {item.nome}
                                            </p>
                                            <p>
                                                <strong>Quantidade Consumida:</strong> {item.quantidade}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <button
                            className="btn btn-secondary"
                            onClick={this.toggleShowTopItensPorPet}
                            style={{
                                padding: "10px 20px",
                                fontSize: "16px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginTop: "20px",
                            }}
                        >
                            Fechar Lista de Itens por Tipo de Pet
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

