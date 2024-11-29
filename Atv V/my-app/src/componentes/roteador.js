import { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaCliente from "./listaCliente";
import CadastroPage from "./navigatetocadastros"; // Importando a página de cadastro de produtos/serviços
import ListaProdutosServicos from "./listaprodeserv";
import CadastroCompra from "./cadastrocompra";
import Listas from "./listas";

const Roteador = () => {
    const [tela, setTela] = useState("Clientes"); // Tela inicial
    const [clientes, setClientes] = useState([]);

    const selecionarView = (novaTela) => {
        setTela(novaTela);
    };

    const barraNavegacao = (
        <BarraNavegacao
            seletorView={selecionarView}
            tema="#e3f2fd"
            botoes={[
                "Cadastro de Clientes",
                "Clientes",
                "Cadastro de Produtos/Serviços",
                "Produtos e Serviços",
                "Cadastrar Compras",
                "Estatísticas",
            ]}
        />
    );

    if (tela === "Clientes") {
        return (
            <>
                {barraNavegacao}
                <ListaCliente tema="#e3f2fd" />
            </>
        );
    }

    if (tela === "Cadastro de Clientes") {
        return (
            <>
                {barraNavegacao}
                <FormularioCadastroCliente
                    tema="#e3f2fd"
                    cadastrarCliente={(clienteData) => {
                        console.log(clienteData); // Aqui você pode processar o cadastro
                    }}
                />
            </>
        );
    }

    if (tela === "Cadastro de Produtos/Serviços") {
        return (
            <>
                {barraNavegacao}
                <CadastroPage tema="#e3f2fd" />
            </>
        );
    }

    if (tela === "Produtos e Serviços") {
        return (
            <>
                {barraNavegacao}
                <ListaProdutosServicos tema="#e3f2fd" />
            </>
        );
    }

    if (tela === "Cadastrar Compras") {
        return (
            <>
                {barraNavegacao}
                <CadastroCompra tema="#e3f2fd" />
            </>
        );
    }

    if (tela === "Estatísticas") {
        return (
            <>
                {barraNavegacao}
                <Listas tema="#e3f2fd" />
            </>
        );
    }

    return null;
};

export default Roteador;
