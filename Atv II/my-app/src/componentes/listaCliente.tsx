import { Component } from "react";
import { insertMaskInCpf } from "../functions/cpf";
import { insertMaskInTelefone } from "../functions/telefonemask";

    type props = {
        tema: string;
    }

    type Pet = {
        nome: string;
        tipo: string;
        raca: string;
        genero: string;
    };

    type Cliente = {
        nome: string;
        nomeSocial?: string;
        email: string;
        telefone: { numero: string };
        cpf: { valor: string };
        rg: { valorrg: string };
        pet: Pet[]; // Adicionando a propriedade pets
        compras: { nomeProduto: string; valor: number }[];  // Alterando para incluir nomeProduto

    };

    type State = {
        clientes: Cliente[];
        expandedIndex: number | null;
        editIndex: number | null; // Armazenar o índice do cliente em modo de edição
        editingCliente: Cliente | null; 
        cpfCliente: string
    };

    export default class ListaCliente extends Component<props, State> {
        state: State = {
            clientes: [],
            expandedIndex: null, 
            editIndex: null, 
            editingCliente: null,
            cpfCliente:"" // Inicialmente sem cliente para editar
        };

        componentDidMount() {
            // Carrega dados do localStorage
            const clientesLocalStorage = localStorage.getItem("clientes");
            if (clientesLocalStorage) {
                try {
                    const parsedClientes = JSON.parse(clientesLocalStorage);
                    if (Array.isArray(parsedClientes) && parsedClientes.every(cliente => cliente.nome)) {
                        this.setState({ clientes: parsedClientes });
                    }
                } catch (error) {
                    console.error("Erro ao analisar os dados do localStorage:", error);
                }
            }
        
            // Busca os dados do arquivo JSON, sem adicionar clientes duplicados
        }

        toggleDropdown = (index: number) => {
            this.setState(prevState => {
                const newIndex = prevState.expandedIndex === index ? null : index;
                return { expandedIndex: newIndex };
            });
        };

        

        deleteCliente = (cpf: string) => {
            const { clientes } = this.state;
            const updatedClientes = clientes.filter(cliente => cliente.cpf.valor !== cpf);
            this.setState({ clientes: updatedClientes });
            localStorage.setItem("clientes", JSON.stringify(updatedClientes));
        };

        // Ativa o modo de edição
        enableEdit = (cliente: Cliente, index: number) => {
            this.setState({ editIndex: index, editingCliente: { ...cliente } });
        };

        // Atualiza as informações do cliente
        handleChange = (field: string, value: string, petIndex?: number) => {
            const { editingCliente } = this.state;
            if (editingCliente) {
                if (petIndex !== undefined) {
                    // Atualiza o pet específico
                    const updatedPets = [...editingCliente.pet];
                    updatedPets[petIndex] = { ...updatedPets[petIndex], [field]: value };
                    this.setState({
                        editingCliente: { ...editingCliente, pet: updatedPets }
                    });
                } else if (field === "telefone") {
                    // Aplica a máscara de telefone antes de atualizar o campo
                    const maskedTelefone = insertMaskInTelefone(value);
                    this.setState({
                        editingCliente: {
                            ...editingCliente,
                            telefone: { ...editingCliente.telefone, numero: maskedTelefone }
                        }
                    });
                } else {
                    // Atualiza outros campos diretamente
                    this.setState({
                        editingCliente: { ...editingCliente, [field]: value }
                    });
                }
            }
        };
        


        // Salva as alterações no cliente
        saveEdit = () => {
            const { editingCliente, clientes, editIndex } = this.state;
            if (editingCliente && editIndex !== null) {
                const updatedClientes = [...clientes];
                updatedClientes[editIndex] = editingCliente; // Atualiza o cliente com os novos dados
                this.setState({ clientes: updatedClientes, editIndex: null, editingCliente: null });
                localStorage.setItem("clientes", JSON.stringify(updatedClientes)); // Salva no localStorage
            }
        };

        render() {
            const { tema } = this.props;
            const { clientes, expandedIndex, editIndex, editingCliente } = this.state;

            return (
                <div className="container-fluid">
                    <div className="list-group">
                        {clientes.map((cliente, index) => (
                            <div key={index}>
                                <a 
                                    href="#" 
                                    className="list-group-item list-group-item-action" 
                                    style={index === 3 ? { backgroundColor: tema } : {}}
                                    onClick={() => this.toggleDropdown(index)}
                                >
                                    {cliente.nome}

                                    
                                </a>

                                {expandedIndex === index && (
                                    <div className="dropdown-content" style={{ padding: "20px", border: "1px solid #ddd", position: "relative" }}>


                                        {/* Verifique se não está em edição antes de exibir os botões */}
                                        {editIndex !== index && (
                                            <>
                                                {/* Botão de deletar */}
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => this.deleteCliente(cliente.cpf.valor)}
                                                    style={{
                                                        position: "absolute",
                                                        top: "10px",
                                                        right: "10px",
                                                        backgroundColor: "red",
                                                        color: "white",
                                                        border: "none",
                                                        cursor: "pointer",
                                                        padding: "5px 10px",
                                                    }}
                                                >
                                                    Deletar
                                                </button>

                                                {/* Botão de editar */}
                                                <button
                                                    className="btn btn-info"
                                                    onClick={() => this.enableEdit(cliente, index)}
                                                    style={{
                                                        position: "absolute",
                                                        top: "10px",
                                                        right: "90px",
                                                        color: "white",
                                                        border: "none",
                                                        cursor: "pointer",
                                                        padding: "5px 10px",
                                                    }}
                                                >
                                                    Atualizar
                                                </button>
                                            </>
                                        )}

                                        {editIndex === index && editingCliente ? (
                                            <div>
                                                <input 
                                                    type="text"
                                                    className="inputscadastrocliente2"
                                                    value={editingCliente.nome}
                                                    onChange={(e) => this.handleChange("nome", e.target.value)}
                                                    placeholder="Nome"
                                                />
                                                <input 
                                                    type="text" 
                                                    className="inputscadastrocliente2"
                                                    value={editingCliente.email}
                                                    onChange={(e) => this.handleChange("email", e.target.value)}
                                                    placeholder="Email"
                                                />
                                                <input 
                                                    type="text" 
                                                    className="inputscadastrocliente2"
                                                    value={editingCliente.telefone.numero}
                                                    onChange={(e) => this.handleChange("telefone", e.target.value)}
                                                    placeholder="Telefone"
                                                />

        
                                                <div>
                                                    {editingCliente.pet.map((pet, petIndex) => (
                                                        <div key={petIndex} style={{ marginBottom: "10px" }}>
                                                            <input 
                                                                type="text"
                                                                className="inputscadastrocliente2"
                                                                value={pet.nome}
                                                                onChange={(e) => this.handleChange("nome", e.target.value, petIndex)}
                                                                placeholder="Nome do Pet"
                                                            />
                                                            <input 
                                                                type="text" 
                                                                className="inputscadastrocliente2"
                                                                value={pet.tipo}
                                                                onChange={(e) => this.handleChange("tipo", e.target.value, petIndex)}
                                                                placeholder="Tipo do Pet"
                                                            />
                                                            <input 
                                                                type="text" 
                                                                className="inputscadastrocliente2"
                                                                value={pet.raca}
                                                                onChange={(e) => this.handleChange("raca", e.target.value, petIndex)}
                                                                placeholder="Raça do Pet"
                                                            />
                                                            <input 
                                                                type="text" 
                                                                className="inputscadastrocliente2"
                                                                value={pet.genero}
                                                                onChange={(e) => this.handleChange("genero", e.target.value, petIndex)}
                                                                placeholder="Gênero do Pet"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                

                                                <button className="btn btn-success" onClick={this.saveEdit} style={{ backgroundColor: "green", color: "white", padding: "5px 10px", }}>
                                                    Salvar
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                {cliente.nomeSocial && (
                                                    <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
                                                )}
                                                <p><strong>Email:</strong> {cliente.email || "Não informado"}</p>
                                                <p><strong>Telefone:</strong> {cliente.telefone.numero || "Não informado"}</p>
                                                <p><strong>CPF:</strong> {cliente.cpf.valor}</p>
                                                <p><strong>RG:</strong> {cliente.rg.valorrg}</p>

                                                {cliente.pet.length > 0 ? (
                                                    <ul>
                                                        {cliente.pet.map((pet, petIndex) => (
                                                            <li key={petIndex}>
                                                                <p><strong>Nome do Pet:</strong> {pet.nome}</p>
                                                                <p><strong>Tipo do Pet:</strong> {pet.genero}</p>
                                                                <p><strong>Raça do Pet:</strong> {pet.raca}</p>
                                                                <p><strong>Gênero do Pet:</strong> {pet.tipo}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>Este cliente não tem pets.</p>
                                                )}

                                                
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }
