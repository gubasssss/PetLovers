import Entrada from "../io/entrada"
import Cadastro from "./cadastro"
import Servico from "../modelo/servico"

export default class CadastroServico extends Cadastro{
    private servico : Array<Servico>
    private entrada : Entrada
    private static idCounter: number = 1

    constructor(servico: Array<Servico> ){
        super()
        this.servico = servico
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\n Iníco do cadastro de Serviços`)
        let idserv = CadastroServico.idCounter++
        let nomeserv = this.entrada.receberTexto(`Por favor informe o nome do serviço:`)

        let valorprodInput = this.entrada.receberNumero(`Por favor informe o valor do produto:`)
        let valorserv = Number(valorprodInput); // Convert to number
        if (isNaN(valorserv)) {
            console.error("Valor inválido, não é um número.");
            return; // Exit the method if the value is not valid
        }        
        let descricaoserv = this.entrada.receberTexto(`Por favor coloque uma breve descrição do serviço:`)
        let tiposerv = this.entrada.receberTexto(`Por favor informe o tipo do serviço:`)

        let servico = new Servico(idserv,nomeserv,valorserv,descricaoserv,tiposerv)

        this.servico.push(servico)
        console.log(`\nCadastro concluído,ID do produto: ${idserv}\n`)

    }

}
