import Entrada from "../io/entrada"
import Atualizar from "./atualizar"
import Servico from "../modelo/servico"

export default class AtualizarServico extends Atualizar {
    private servico: Array<Servico>
    private entrada: Entrada

    constructor(servico: Array<Servico>) {
        super()
        this.servico = servico
        this.entrada = new Entrada()
    }



    public atualizar(): void {
        console.log(`\nInício da atualização do serviço`)
        let idAtualizar = this.entrada.receberNumero(`Por favor informe o número do ID do serviço que deseja atualizar: `)

        let servicoEncontrado = this.servico.find(servico => servico.getIdServico    === idAtualizar)

        if (servicoEncontrado) {
            console.log(`\Serviço encontrado! Por favor, insira as novas informações.\n`)

            let novoNome = this.entrada.receberTexto(`Por favor informe o novo nome do serviço (ou pressione Enter para manter o nome atual): `)
            let novoValorInput = this.entrada.receberTexto(`Por favor informe o novo valor do produto (ou pressione Enter para manter o valor atual): `)
            let novoValor = novoValorInput ? Number(novoValorInput) : undefined; // Convert to number

            // Check if the conversion is valid
            if (novoValorInput && isNaN(novoValor)) {
                console.error("Valor inválido, não é um número.");
                return; // Exit the method if the value is not valid
            }               let novaDescricao = this.entrada.receberTexto(`Por favor informe a nova descrição (ou pressione Enter para manter a descrição atual):`)
            let novoTipo = this.entrada.receberTexto(`Por favor informe o novo tipo ( ou pressione Enter para manter o tipo atual):`)
           
            if (novoNome) servicoEncontrado.nomesserv = novoNome
            if (novoValor) servicoEncontrado.valorserv = novoValor
            if (novaDescricao) servicoEncontrado.descricaoserv = novaDescricao
   

            console.log(`\nAtualização concluída com sucesso!\n`)
        } else {
            console.log(`\Serviço com ID ${idAtualizar} não encontrado.\n`)  
        }
    }
}