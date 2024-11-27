
import Cliente from "../modelo/cliente"
import Compra from "../modelo/compra";
import CPF from "../modelo/cpf";
import Pet from "../modelo/pet";
import RG from "../modelo/rg";
import Telefone from "../modelo/telefone";
import Listagem from "./listagem"
import * as fs from 'fs';


export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes

        this.carregarClientesPredefinidos()
    }

    private carregarClientesPredefinidos(): void{
        const dadosPredefinidos = JSON.parse(fs.readFileSync('src/modelo/clientepet.json', 'utf-8'));

        dadosPredefinidos.clientes.forEach((clienteData: any) => {
            const compras = clienteData.compras.map((compra: any) => 
                new Compra(clienteData.cpf.numero, compra.itemId, compra.tipoItem)
            );
            const pets = clienteData.pets.map((petData: any) => 
                new Pet(petData.nome, petData.raca, petData.genero, petData.tipo)
            );               
            const cliente = new Cliente(
                clienteData.nome,
                clienteData.nomeSocial,
                clienteData.email,
                new CPF(clienteData.cpf.numero, clienteData.cpf.dataEmissao), // Criando a instância de CPF
                new Telefone(clienteData.telefone.ddd, clienteData.telefone.numero), // Criando a instância de Telefone
                pets,
                new RG(clienteData.rg.numero, clienteData.rg.dataEmissao), // Criando a instância de RG
                compras
            );
            this.clientes.push(cliente);
        });
    }
    public listar(): void {
        console.log(`\nLista de todos os clientes e seus pets:`)
        this.clientes.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome)
            if (cliente.nomeSocial && cliente.nomeSocial.trim() !== "") {
                console.log(`Nome social: ` + cliente.nomeSocial)
            }      
            console.log(`Email:`+ cliente.email)      
            console.log(`CPF: ` + cliente.getCpf.getValor)
            console.log(`RG:`+ cliente.getRgs.getValorrg)
            // eslint-disable-next-line no-useless-concat
            console.log(`Telefone:`+ '(',cliente.getTelefones.getDdd,')'+ cliente.getTelefones.getNumero)
            if (cliente.getPets.length > 0) {
                console.log(`Pets:`)
                cliente.getPets.forEach((pet, index) => {
                    console.log(`  ${index + 1}. Nome do pet: ${pet.getNome}, Tipo: ${pet.getTipo}, Raça: ${pet.getRaca}, Gênero: ${pet.getGenero}`)
                });
            } else {
                console.log(`Este cliente não possui pets.`)
            }            console.log(`--------------------------------------`)
        })
        console.log(`\n`)
    }
}
