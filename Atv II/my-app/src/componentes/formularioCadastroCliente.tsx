import React, { Component } from "react";
import Telefone from "../modelo/telefone";
import RG from "../modelo/rg";
import CPF from "../modelo/cpf";
import Pet from "../modelo/pet";
import Compra from "../modelo/compra";
import { insertMaskInCpf } from "../functions/cpf";
import { insertMaskInRG } from "../functions/rg";
import { insertMaskInTelefone } from "../functions/telefonemask";
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
    tema: string;
    cadastrarCliente: (clienteData: Cliente) => void;
};

interface Cliente {
    nome: string;
    nomeSocial?: string;
    email: string;
    telefone: Telefone;
    rg: RG;
    cpf: CPF;
    dataCadastro: Date;
    compras: Array<Compra>;
    pet: Array<Pet>;
}

type State = {
    nome: string;
    nomeSocial: string;
    categoriaNomeSocial: string;
    email: string;
    pet: Array<Pet>;
    nomepet: string;
    tipo: string;
    raca: string;
    genero: string;
    telefone: Telefone;
    rg: RG;
    dataEmissaoRG: string;
    cpf: CPF;
    dataEmissaoCpf: string;
    dataCadastro: Date;
    compras: Array<Compra>;
    cadastroConcluido: boolean;
    camposObrigatoriosFaltando: boolean;
    erroCpfExistente: boolean;
    erros: { [key: string]: string };
};

export default class FormularioCadastroCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: "",
            nomeSocial: "",
            categoriaNomeSocial: "",
            email: "",
            pet: [],
            nomepet: "",
            tipo: "",
            raca: "",
            genero: "",
            telefone: new Telefone(""),
            rg: new RG("", new Date()),
            dataEmissaoRG: "",
            cpf: new CPF("", new Date()),
            dataEmissaoCpf: "",
            dataCadastro: new Date(),
            compras: [],
            cadastroConcluido: false,
            erroCpfExistente: false,
            camposObrigatoriosFaltando: false,
            erros: {}
        };
    }

    handleFocus = (fieldName: string) => {
        this.setState(prevState => ({
            erros: {
                ...prevState.erros,
                [fieldName]: ""
            }
        }));
    };

    handleTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const maskedTelefone = insertMaskInTelefone(value);
        this.setState({
            telefone: new Telefone(maskedTelefone)
        });
    };

    handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const maskedCpf = insertMaskInCpf(event.target.value);
        const cpfAtualizado = new CPF(maskedCpf, this.state.cpf.getDataEmissao);
        this.setState({ cpf: cpfAtualizado, erroCpfExistente: false, erros: { ...this.state.erros, cpf: "" } });
    };

    handleRGChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const maskedRG = insertMaskInRG(event.target.value);
        const rgAtualizado = new RG(maskedRG, this.state.rg.getDataEmissaorg);
        this.setState({ rg: rgAtualizado });
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        } as unknown as Pick<State, keyof State>);
    };

    private successMessageRef = React.createRef<HTMLDivElement>();

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const {
            nome, email, cpf, rg, dataCadastro, compras, pet, dataEmissaoRG, dataEmissaoCpf,
            nomepet, tipo, raca, genero
        } = this.state;

        const camposObrigatorios = [
            { campo: nome, nome: "nome" },
            { campo: email, nome: "email" },
            { campo: cpf.getValor, nome: "cpf" },
            { campo: rg.getValorrg, nome: "rg" },
            { campo: dataEmissaoRG, nome: "dataEmissaoRG" },
            { campo: this.state.telefone.getNumero, nome: "telefone" },
            { campo: dataEmissaoCpf, nome: "dataEmissaoCpf" },
            { campo: nomepet, nome: "nomepet" },
            { campo: tipo, nome: "tipo" },
            { campo: raca, nome: "raca" },
            { campo: genero, nome: "genero" }
        ];

        const erros: { [key: string]: string } = {};
        let camposFaltando = false;

        camposObrigatorios.forEach(({ campo, nome }) => {
            if (!campo) {
                erros[nome] = "Campo obrigatório!";
                camposFaltando = true;
            }
        });

        if (camposFaltando) {
            this.setState({ erros, camposObrigatoriosFaltando: true });
            return;
        }

        const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
        const cpfExistente = clientes.some((cliente: Cliente) => cliente.cpf.getValor === cpf.getValor);

        if (cpfExistente) {
            this.setState({
                erroCpfExistente: true,
                erros: { ...this.state.erros, cpf: "Este CPF já está cadastrado." }
            });
            return;
        }

        const novoPet = new Pet(nomepet, raca, tipo, genero);
        const petsAtualizados = [...pet, novoPet];
        const clienteData = {
            nome,
            nomeSocial: this.state.categoriaNomeSocial ? `${this.state.nomeSocial} (${this.state.categoriaNomeSocial})` : this.state.nomeSocial,
            email,
            telefone: this.state.telefone,
            rg: new RG(this.state.rg.getValorrg, new Date(dataEmissaoRG)),
            cpf: new CPF(this.state.cpf.getValor, new Date(dataEmissaoCpf)),
            dataCadastro,
            compras,
            pet: petsAtualizados
        };

        clientes.push(clienteData);
        localStorage.setItem("clientes", JSON.stringify(clientes));

        this.setState({ cadastroConcluido: true }, () => {
            if (this.successMessageRef.current) {
                this.successMessageRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            setTimeout(() => this.setState({ cadastroConcluido: false }), 3000);
            this.resetForm();
        });
    };

    resetForm = () => {
        this.setState({
            nome: "",
            nomeSocial: "",
            categoriaNomeSocial: "",
            email: "",
            telefone: new Telefone(""),
            rg: new RG("", new Date()),
            dataEmissaoRG: "",
            cpf: new CPF("", new Date()),
            dataEmissaoCpf: "",
            dataCadastro: new Date(),
            pet: [],
            nomepet: "",
            tipo: "",
            raca: "",
            genero: "",
            compras: [],
            erros: {}
        });
    };

        render() {
            const {erros, cadastroConcluido,erroCpfExistente} = this.state
            return (
                <div className="container-fluid">
                    <form onSubmit={this.handleSubmit}>
                    {cadastroConcluido && (
                            <div  ref={this.successMessageRef} className="alert alert-info" role="alert">
                                Cliente cadastrado com sucesso!
                            </div>
                        )}
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={`inputscadastrocliente ${erros.nome ? 'is-invalid' : ''}`}
                                placeholder="Nome"
                                name="nome"
                                value={this.state.nome}
                                onChange={this.handleInputChange}
                                onFocus={() => this.handleFocus("nome")}

                            />
                                {erros.nome && <div className="invalid-feedback"/>}

                        </div>
                                                            
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={`inputscadastrocliente`}
                                placeholder="Nome social (Opcional)"
                                name="nomeSocial"
                                value={this.state.nomeSocial}
                                onChange={this.handleInputChange}
                            />
                    
                        </div>

                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={`inputscadastrocliente ${erros.email ? 'is-invalid' : ''}`}
                                placeholder="E-mail"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                onFocus={() => this.handleFocus("email")}

                            />
                                {erros.email && <div className="invalid-feedback"/>}

                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={`inputscadastrocliente ${erros.cpf || erroCpfExistente ? 'is-invalid' : ''}`}
                                placeholder="CPF"
                                name="cpf"
                                value= {this.state.cpf.getValor}
                                onChange={this.handleCpfChange}
                                onFocus={() => this.handleFocus("cpf")}

                                />
                                {erros.cpf && <div className="invalid-feedback"/>}
                        </div>

        

                        <div className="input-group mb-3">
                            <input
                                type="date"
                                className={`inputscadastrocliente ${erros.dataEmissaoCpf ? 'is-invalid' : ''}`}
                                placeholder="Data Emissão CPF"
                                name="dataEmissaoCpf"
                                value={this.state.dataEmissaoCpf}
                                onChange={this.handleInputChange}
                                onFocus={() => this.handleFocus("dataEmissaoCpf")}

                                />
                                {erros.dataEmissaoCpf && <div className="invalid-feedback"/>}
                        </div>

            

                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={`inputscadastrocliente ${erros.rg ? 'is-invalid' : ''}`}
                                placeholder="RG"
                                name="rg"
                                value={this.state.rg.getValorrg}
                                onChange={this.handleRGChange}
                                onFocus={() => this.handleFocus("rg")}

                                />
                                {erros.rg && <div className="invalid-feedback"/>}

                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="date"
                                className={`inputscadastrocliente ${erros.dataEmissaoRG ? 'is-invalid' : ''}`}
                                placeholder="Data Emissão RG"
                                name="dataEmissaoRG"
                                value={this.state.dataEmissaoRG}
                                onChange={this.handleInputChange}
                                onFocus={() => this.handleFocus("dataEmissaoRG")}

                                />
                                {erros.dataEmissaoRG && <div className="invalid-feedback"/>}

                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={`inputscadastrocliente ${erros.telefone ? 'is-invalid' : ''}`}
                                placeholder="(DDD) 99999-9999"
                                name="telefone"
                                value={this.state.telefone.getNumero}
                                onChange={this.handleTelefoneChange}
                                onFocus={() => this.handleFocus("telefone")}

                            />
                                {erros.telefone && <div className="invalid-feedback"/>}

                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={`inputscadastrocliente ${erros.nomepet ? 'is-invalid' : ''}`}
                                placeholder="Nome do Pet"
                                name="nomepet"
                                value={this.state.nomepet}
                                onChange={this.handleInputChange}
                                onFocus={() => this.handleFocus("nomepet")}

                            />
                                {erros.nomepet && <div className="invalid-feedback"/>}

                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={`inputscadastrocliente ${erros.tipo ? 'is-invalid' : ''}`}
                                placeholder="Tipo do Pet"
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleInputChange}
                                onFocus={() => this.handleFocus("tipo")}

                            />
                                {erros.tipo && <div className="invalid-feedback"/>}

                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={`inputscadastrocliente ${erros.raca ? 'is-invalid' : ''}`}
                                placeholder="Raça do Pet"
                                name="raca"
                                value={this.state.raca}
                                onChange={this.handleInputChange}
                                onFocus={() => this.handleFocus("raca")}

                            />
                                {erros.raca && <div className="invalid-feedback"/>}

                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={`inputscadastrocliente ${erros.genero ? 'is-invalid' : ''}`}
                                placeholder="Gênero do Pet"
                                name="genero"
                                value={this.state.genero}
                                onChange={this.handleInputChange}
                                onFocus={() => this.handleFocus("genero")}

                            />
                                {erros.genero && <div className="invalid-feedback"/>}

                        </div>

                        <div className="input-group mb-3">
                            <button
                                style={{marginLeft:495}}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Cadastrar


                            </button>
        
                        </div>
                    </form>
                </div>
            );
        }
    }

