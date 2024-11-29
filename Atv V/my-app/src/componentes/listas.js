import React, { useState, useEffect } from "react";

const Listas = ({ tema }) => {
    const [clientes, setClientes] = useState([]);
    const [showTopClientes, setShowTopClientes] = useState(false);
    const [showTopItens, setShowTopItens] = useState(false);
    const [showTopItensPorPet, setShowTopItensPorPet] = useState(false);
    const [showTopRacaPorPet, setShowTopRacaPorPet] = useState(false);
    const [showTopClientesPorValor, setShowTopClientesPorValor] = useState(false);
    const [topItens, setTopItens] = useState([]);
    const [topItensPorPet, setTopItensPorPet] = useState([]);
    const [topItensPorRaca, setTopItensPorRaca] = useState([]);
    const [topClientesPorValor, setTopClientesPorValor] = useState([]);

    useEffect(() => {
        const clientesStorage = localStorage.getItem("clientes");
        if (clientesStorage) {
            try {
                const parsedClientes = JSON.parse(clientesStorage);
                if (Array.isArray(parsedClientes)) {
                    setClientes(parsedClientes);
                }
            } catch (error) {
                console.error("Erro ao analisar os dados do localStorage:", error);
            }
        }
    }, []);

    const getTopClientesPorValor = () => {
        return clientes
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

    const getTopItensPorRaca = () => {
        const racaItemCounts = {};

        clientes.forEach((cliente) => {
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

    const getTopClientes = (clientes) => {
        return clientes
            .sort((a, b) => b.compras.length - a.compras.length)
            .slice(0, 10);
    };

    const getTopItens = () => {
        const itemCounts = {};
        clientes.forEach((cliente) => {
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

    const getTopItensPorTipoDePet = () => {
        const petItemCounts = {};

        clientes.forEach((cliente) => {
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

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            {/* Botões de exibição */}
            {!showTopClientes && !showTopItens && !showTopItensPorPet && !showTopRacaPorPet && !showTopClientesPorValor && (
                <>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setShowTopClientes(!showTopClientes);
                            setShowTopItens(false);
                            setShowTopItensPorPet(false);
                            setShowTopRacaPorPet(false);
                        }}
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
                        onClick={() => {
                            const topItens = getTopItens();
                            setTopItens(topItens);
                            setShowTopItens(!showTopItens);
                            setShowTopClientes(false);
                            setShowTopItensPorPet(false);
                            setShowTopRacaPorPet(false);
                        }}
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
                        onClick={() => {
                            const topItensPorPet = getTopItensPorTipoDePet();
                            setTopItensPorPet(topItensPorPet);
                            setShowTopItensPorPet(!showTopItensPorPet);
                            setShowTopClientes(false);
                            setShowTopItens(false);
                            setShowTopRacaPorPet(false);
                        }}
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
                        onClick={() => {
                            const topItensPorRaca = getTopItensPorRaca();
                            setTopItensPorRaca(topItensPorRaca);
                            setShowTopRacaPorPet(!showTopRacaPorPet);
                            setShowTopClientes(false);
                            setShowTopItens(false);
                            setShowTopItensPorPet(false);
                        }}
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
                        onClick={() => {
                            const topClientesPorValor = getTopClientesPorValor();
                            setTopClientesPorValor(topClientesPorValor);
                            setShowTopClientesPorValor(!showTopClientesPorValor);
                            setShowTopClientes(false);
                            setShowTopItens(false);
                            setShowTopItensPorPet(false);
                            setShowTopRacaPorPet(false);
                        }}
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
                        Ver Top Clientes por Gasto
                    </button>
                </>
            )}

            {/* Mostrar dados de Top Clientes */}
            {showTopClientes && (
                <div>
                    <h2>Top 10 Clientes</h2>
                    {getTopClientes(clientes).map((cliente, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            {cliente.nome} - {cliente.compras.length} compras
                        </div>
                    ))}
                    <button
                        onClick={() => setShowTopClientes(false)}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "20px",
                        }}
                    >
                        Fechar
                    </button>
                </div>
            )}

            {/* Mostrar Top 5 Itens */}
            {showTopItens && (
                <div>
                    <h2>Top 5 Itens Consumidos</h2>
                    {topItens.map((item, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            {item.nome} - {item.quantidade} vezes
                        </div>
                    ))}
                    <button
                        onClick={() => setShowTopItens(false)}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "20px",
                        }}
                    >
                        Fechar
                    </button>
                </div>
            )}

            {/* Mostrar Itens por Tipo de Pet */}
            {showTopItensPorPet && (
                <div>
                    <h2>Itens por Tipo de Pet</h2>
                    {topItensPorPet.map((pet, index) => (
                        <div key={index}>
                            <h3>{pet.tipoPet}</h3>
                            {pet.itens.map((item, idx) => (
                                <div key={idx} style={{ marginBottom: "10px" }}>
                                    {item.nome} - {item.quantidade} vezes
                                </div>
                            ))}
                        </div>
                    ))}
                    <button
                        onClick={() => setShowTopItensPorPet(false)}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "20px",
                        }}
                    >
                        Fechar
                    </button>
                </div>
            )}

            {/* Mostrar Itens por Raça de Pet */}
            {showTopRacaPorPet && (
                <div>
                    <h2>Itens por Raça de Pet</h2>
                    {topItensPorRaca.map((raca, index) => (
                        <div key={index}>
                            <h3>{raca.raca}</h3>
                            {raca.itens.map((item, idx) => (
                                <div key={idx} style={{ marginBottom: "10px" }}>
                                    {item.nome} - {item.quantidade} vezes
                                </div>
                            ))}
                        </div>
                    ))}
                    <button
                        onClick={() => setShowTopRacaPorPet(false)}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "20px",
                        }}
                    >
                        Fechar
                    </button>
                </div>
            )}

            {/* Mostrar Top Clientes por Gasto */}
            {showTopClientesPorValor && (
                <div>
                    <h2>Top Clientes por Gasto</h2>
                    {topClientesPorValor.map((cliente, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            {cliente.nome} - Gasto total: R${cliente.totalGasto.toFixed(2)}
                        </div>
                    ))}
                    <button
                        onClick={() => setShowTopClientesPorValor(false)}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "20px",
                        }}
                    >
                        Fechar
                    </button>
                </div>
            )}
        </div>
    );
};

export default Listas;
