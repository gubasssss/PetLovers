import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaCliente from "./listaCliente";
import CadastroPage from "./navigatetocadastros"; // Importando a página de cadastro de produtos/serviços
import ListaProdutosServicos from "./listaprodeserv";
import CadastroCompra from "./cadastrocompra";
import Listas from "./listas";

type Cliente = {
    nome: string;
    nomeSocial: string;
    categoriaNomeSocial: string;
    email: string;
    pet: Array<any>; // Defina o tipo correto de Pet aqui
    nomepet: string;
    tipo: string;
    raca: string;
    genero: string;
    telefone: any; // Defina o tipo correto de Telefone aqui
    telefoneCompleto: string;
    rg: any; // Defina o tipo correto de RG aqui
    dataEmissaoRG: string;
    cpf: any; // Defina o tipo correto de CPF aqui
    dataEmissaoCpf: string;
    dataCadastro: Date;
    compras: Array<any>; // Defina o tipo correto de Compra aqui
    cadastroConcluido: boolean;
    erros: { [key: string]: string };
};

type State = {
    tela: string;
    clientes: Cliente[];
};

export default class Roteador extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tela: "Clientes", // Tela inicial
            clientes: [],
        };
        this.selecionarView = this.selecionarView.bind(this);
    }

    selecionarView(novaTela: string) {
        this.setState({
            tela: novaTela,
        });
    }

    render() {
        let barraNavegacao = (
            <BarraNavegacao
                seletorView={this.selecionarView}
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

        if (this.state.tela === "Clientes") {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente tema="#e3f2fd" />
                </>
            );
        }

        if (this.state.tela === "Cadastro de Clientes") {
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

        if (this.state.tela === "Cadastro de Produtos/Serviços") {
            return (
                <>
                    {barraNavegacao}
                    <CadastroPage tema="#e3f2fd" />
                </>
            );
        }

        if (this.state.tela === "Produtos e Serviços"){
            return(
            <>
            {barraNavegacao}
            <ListaProdutosServicos tema="#e3f2fd"/>
            </>
            )
        }

        if (this.state.tela === "Cadastrar Compras"){
            return(
            <>
            {barraNavegacao}
            <CadastroCompra tema="#e3f2fd"/>
            </>
            )
        }

        if (this.state.tela === "Estatísticas"){
            return(
            <>
            {barraNavegacao}
            <Listas tema="#e3f2fd"/>
            </>
            )
        }

        return null;
    }
}
