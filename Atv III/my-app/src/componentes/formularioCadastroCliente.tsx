import React, { useState, useEffect, useRef } from "react";
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

const FormularioCadastroCliente: React.FC<Props> = ({ tema, cadastrarCliente }) => {
    const [state, setState] = useState({
        nome: "",
        nomeSocial: "",
        categoriaNomeSocial: "",
        email: "",
        pet: [] as Array<Pet>,
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
        compras: [] as Array<Compra>,
        cadastroConcluido: false,
        erroCpfExistente: false,
        camposObrigatoriosFaltando: false,
        erros: {} as { [key: string]: string },
    });

    const handleFocus = (fieldName: string) => {
        setState((prevState) => ({
            ...prevState,
            erros: {
                ...prevState.erros,
                [fieldName]: "",
            },
        }));
    };

    const handleTelefoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const maskedTelefone = insertMaskInTelefone(value);
        setState({ ...state, telefone: new Telefone(maskedTelefone) });
    };

    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const maskedCpf = insertMaskInCpf(event.target.value);
        const cpfAtualizado = new CPF(maskedCpf, state.cpf.getDataEmissao);
        setState({ ...state, cpf: cpfAtualizado, erroCpfExistente: false, erros: { ...state.erros, cpf: "" } });
    };

    const handleRGChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const maskedRG = insertMaskInRG(event.target.value);
        const rgAtualizado = new RG(maskedRG, state.rg.getDataEmissaorg);
        setState({ ...state, rg: rgAtualizado });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const {
            nome, email, cpf, rg, dataCadastro, compras, pet, dataEmissaoRG, dataEmissaoCpf,
            nomepet, tipo, raca, genero
        } = state;

        const camposObrigatorios = [
            { campo: nome, nome: "nome" },
            { campo: email, nome: "email" },
            { campo: cpf.getValor, nome: "cpf" },
            { campo: rg.getValorrg, nome: "rg" },
            { campo: dataEmissaoRG, nome: "dataEmissaoRG" },
            { campo: state.telefone.getNumero, nome: "telefone" },
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
            setState({ ...state, erros, camposObrigatoriosFaltando: true });
            return;
        }

        const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
        const cpfExistente = clientes.some((cliente: Cliente) => cliente.cpf.getValor === cpf.getValor);

        if (cpfExistente) {
            setState({
                ...state,
                erroCpfExistente: true,
                erros: { ...state.erros, cpf: "Este CPF já está cadastrado." }
            });
            return;
        }

        const novoPet = new Pet(nomepet, raca, tipo, genero);
        const petsAtualizados = [...pet, novoPet];
        const clienteData = {
            nome,
            nomeSocial: state.categoriaNomeSocial ? `${state.nomeSocial} (${state.categoriaNomeSocial})` : state.nomeSocial,
            email,
            telefone: state.telefone,
            rg: new RG(state.rg.getValorrg, new Date(dataEmissaoRG)),
            cpf: new CPF(state.cpf.getValor, new Date(dataEmissaoCpf)),
            dataCadastro,
            compras,
            pet: petsAtualizados
        };

        clientes.push(clienteData);
        localStorage.setItem("clientes", JSON.stringify(clientes));

        setState({ ...state, cadastroConcluido: true, erroCpfExistente: false, camposObrigatoriosFaltando: false });

        // Exibindo o alerta de cadastro concluído
        alert("Cadastro concluído com sucesso!");

        // Limpando os campos após 3 segundos
                setState({
                    nome: "",
                    nomeSocial: "",
                    categoriaNomeSocial: "",
                    email: "",
                    pet: [] as Array<Pet>,
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
                    compras: [] as Array<Compra>,
                    erros: {},
                    cadastroConcluido: false,
                    erroCpfExistente: false,
                    camposObrigatoriosFaltando: false,
                });
            };

    // Mover o useEffect para o corpo do componente
    useEffect(() => {
        if (state.cadastroConcluido) {
        }
    }, [state.cadastroConcluido]);

    const { erros, cadastroConcluido, erroCpfExistente } = state;

    return (
        <div className="container-fluid">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className={`inputscadastrocliente ${erros.nome ? 'is-invalid' : ''}`}
                        placeholder="Nome"
                        name="nome"
                        value={state.nome}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("nome")}
                    />
                    {erros.nome && <div className="invalid-feedback"></div>}
                </div>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="inputscadastrocliente"
                        placeholder="Nome social (Opcional)"
                        name="nomeSocial"
                        value={state.nomeSocial}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className={`inputscadastrocliente ${erros.email ? 'is-invalid' : ''}`}
                        placeholder="E-mail"
                        name="email"
                        value={state.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("email")}
                    />
                    {erros.email && <div className="invalid-feedback"></div>}
                </div>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className={`inputscadastrocliente ${erros.cpf || erroCpfExistente ? 'is-invalid' : ''}`}
                        placeholder="CPF"
                        name="cpf"
                        value={state.cpf.getValor}
                        onChange={handleCpfChange}
                        onFocus={() => handleFocus("cpf")}
                    />
                    {erros.cpf && <div className="invalid-feedback"></div>}
                    {erroCpfExistente && <div className="invalid-feedback">Este CPF já está cadastrado.</div>}
                </div>

                <div className="input-group mb-3">
                    <input
                        type="date"
                        className={`inputscadastrocliente ${erros.dataEmissaoCpf ? 'is-invalid' : ''}`}
                        placeholder="Data Emissão CPF"
                        name="dataEmissaoCpf"
                        value={state.dataEmissaoCpf}
                        onChange={handleInputChange}
                    />
                    {erros.dataEmissaoCpf && <div className="invalid-feedback"></div>}
                </div>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className={`inputscadastrocliente ${erros.telefone ? 'is-invalid' : ''}`}
                        placeholder="Telefone"
                        name="telefone"
                        value={state.telefone.getNumero}
                        onChange={handleTelefoneChange}
                    />
                    {erros.telefone && <div className="invalid-feedback"></div>}

                </div>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className={`inputscadastrocliente ${erros.rg ? 'is-invalid' : ''}`}
                        placeholder="RG"
                        name="rg"
                        value={state.rg.getValorrg}
                        onChange={handleRGChange}
                    />
                    {erros.rg && <div className="invalid-feedback"></div>}

                </div>

                <div className="input-group mb-3">
                    <input
                        type="date"
                        className={`inputscadastrocliente ${erros.dataEmissaoRG ? 'is-invalid' : ''}`}
                        placeholder="Data Emissão RG"
                        name="dataEmissaoRG"
                        value={state.dataEmissaoRG}
                        onChange={handleInputChange}
                    />
                    {erros.dataEmissaoRG && <div className="invalid-feedback"></div>}

                </div>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="inputscadastrocliente"
                        placeholder="Nome do Pet"
                        name="nomepet"
                        value={state.nomepet}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="inputscadastrocliente"
                        placeholder="Tipo do Pet"
                        name="tipo"
                        value={state.tipo}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="inputscadastrocliente"
                        placeholder="Raça do Pet"
                        name="raca"
                        value={state.raca}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="inputscadastrocliente"
                        placeholder="Gênero do Pet"
                        name="genero"
                        value={state.genero}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    );
};

export default FormularioCadastroCliente;
