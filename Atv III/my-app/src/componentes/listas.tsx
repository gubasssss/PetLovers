import React, { useState, useEffect } from "react";

type Props = {
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

const Listas: React.FC<Props> = ({ tema }) => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [showTopClientes, setShowTopClientes] = useState(false);
    const [showTopItens, setShowTopItens] = useState(false);
    const [showTopItensPorPet, setShowTopItensPorPet] = useState(false);
    const [showTopRacaPorPet, setShowTopRacaPorPet] = useState(false);
    const [showTopClientesPorValor, setShowTopClientesPorValor] = useState(false);
    const [topItens, setTopItens] = useState<{ nome: string; quantidade: number }[]>([]);
    const [topItensPorPet, setTopItensPorPet] = useState<{ tipoPet: string; itens: { nome: string; quantidade: number }[] }[]>([]);
    const [topItensPorRaca, setTopItensPorRaca] = useState<{ raca: string; itens: { nome: string; quantidade: number }[] }[]>([]);
    const [topClientesPorValor, setTopClientesPorValor] = useState<{ nome: string; totalGasto: number }[]>([]);

    useEffect(() => {
        const clientesStorage = localStorage.getItem("clientes");
        if (clientesStorage) {
            try {
                const parsedClientes: Cliente[] = JSON.parse(clientesStorage);
                if (Array.isArray(parsedClientes)) {
                    setClientes(parsedClientes);
                }
            } catch (error) {
                console.error("Erro ao analisar os dados do localStorage:", error);
            }
        }
    }, []);

    const getTopClientesPorValor = (): { nome: string; totalGasto: number }[] => {
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

    const getTopItensPorRaca = (): { raca: string; itens: { nome: string; quantidade: number }[] }[] => {
        const racaItemCounts: { [key: string]: { [item: string]: number } } = {};

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

    const getTopClientes = (clientes: Cliente[]): Cliente[] => {
        return clientes
            .sort((a, b) => b.compras.length - a.compras.length)
            .slice(0, 10);
    };

    const getTopItens = (): { nome: string; quantidade: number }[] => {
        const itemCounts: { [key: string]: number } = {};
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

    const getTopItensPorTipoDePet = (): { tipoPet: string; itens: { nome: string; quantidade: number }[] }[] => {
        const petItemCounts: { [key: string]: { [item: string]: number } } = {};

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
        {topItensPorPet.map((item, index) => (
            <div key={index}>
                <h3>{item.tipoPet}</h3>
                {item.itens.map((i, idx) => (
                    <div key={idx} style={{ marginBottom: "10px" }}>
                        {i.nome} - {i.quantidade} vezes
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

{/* Mostrar Top Clientes por Gasto */}
{showTopClientesPorValor && (
    <div>
        <h2>Top Clientes por Gasto</h2>
        {topClientesPorValor.map((cliente, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
                {cliente.nome} - Total Gasto: R$ {cliente.totalGasto.toFixed(2)}
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

{/* Mostrar Itens por Raça de Pet */}
{showTopRacaPorPet && (
    <div>
        <h2>Itens por Raça de Pet</h2>
        {topItensPorRaca.map((item, index) => (
            <div key={index}>
                <h3>{item.raca}</h3>
                {item.itens.map((i, idx) => (
                    <div key={idx} style={{ marginBottom: "10px" }}>
                        {i.nome} - {i.quantidade} vezes
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

</div>)}

export default Listas;
