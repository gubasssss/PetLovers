
import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Cadastro from "./cadastro"
import Pet from "../modelo/pet"
import Telefone from "../modelo/telefone"
import RG from "../modelo/rg"
import Compra from "../modelo/compra"


export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>
    private entrada: Entrada

    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }

    private stringParaData(dataString: string): Date {
        const partes = dataString.split("/");
        const dia = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1; // Meses são indexados de 0 a 11
        const ano = parseInt(partes[2], 10);
        return new Date(ano, mes, dia);
    }

    
    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente`)
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
        let desejaNomeSocial = this.entrada.receberTexto(`Deseja informar o nome social? (S/N): `)
        let nomeSocial = ""
        if (desejaNomeSocial.toLowerCase() === 's') {
            nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
        }        
        let email = this.entrada.receberTexto(`Por favor informe o email do cliente:`)
        let valor = this.entrada.receberTexto(`Por favor informe o número do cpf: `)
        const cpfExistente = this.clientes.find(cliente => cliente.getCpf.getValor === valor)
        if (cpfExistente) {
            console.log(`\nErro: O CPF informado já está cadastrado.\n`)
            return
        }
        let data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `)
        let datacpf = this.stringParaData(data);

        let valorrg = this.entrada.receberTexto(`Por favor informe o número do rg:`)
        let dataEmissaorgString = this.entrada.receberTexto(`Por favor informe a data de emissão do rg, no padrão dd/mm/yyyy:`)
        let dataEmissaoRg = this.stringParaData(dataEmissaorgString);
        let ddd = this.entrada.receberTexto(`Coloque o DDD do telefone do cliente:`)
        let numero = this.entrada.receberTexto(`Coloque o número do cliente:`)


        
        let partesDataCpf = data.split('/')
        let anoCpf = parseInt(partesDataCpf[2])
        let mesCpf = parseInt(partesDataCpf[1]) - 1
        let diaCpf = parseInt(partesDataCpf[0])

        let partesDataRg = dataEmissaorgString.split('/')
        let anoRg = parseInt(partesDataRg[2])
        let mesRg = parseInt(partesDataRg[1]) - 1
        let diaRg = parseInt(partesDataRg[0])



        
        let telefone = new Telefone(ddd,numero)
        let dataEmissaoCpf = datacpf; // Você já converteu para Date
        let dataEmissaorgDate = dataEmissaoRg; // Você já converteu para Date
        let cpf = new CPF(valor, dataEmissaoCpf)
        let rg = new RG(valorrg,dataEmissaorgDate)
        let compras:Array<Compra> = []


 

        let pets: Array<Pet> = []
        do {
            let nomepet = this.entrada.receberTexto(`Por favor informe o nome do pet: `)
            let tipo = this.entrada.receberTexto(`Por favor informe o tipo do pet: `)
            let raca = this.entrada.receberTexto(`Por favor informe a raça do pet: `)
            let genero = this.entrada.receberTexto(`Por favor informe o gênero do pet: `)
            
            let pet = new Pet(nomepet, raca, genero, tipo)
            pets.push(pet)

            var maisPets = this.entrada.receberTexto(`Deseja cadastrar mais um pet? (S/N): `)
        } while (maisPets.toLowerCase() === 's')

        let cliente = new Cliente(nome, nomeSocial,email, cpf, telefone, pets, rg,compras)
        this.clientes.push(cliente)
        console.log(`\nCadastro concluído :)\n`)
    }
}
