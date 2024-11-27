import Deletar from "./deletar" 
import Entrada from "../io/entrada" 
import Servico from "../modelo/servico"

export default class DeletarServico extends Deletar {
    private servico: Array<Servico>
    private entrada: Entrada

    constructor(servico: Array<Servico>) {
        super()
        this.servico = servico
        this.entrada = new Entrada()
    }

    public deleta(): void {
        console.log(`\nInício da exclusão do produto`)
        let idDeletar = this.entrada.receberNumero(`Por favor informe o número do ID do serviço que deseja excluir: `)

        let indiceServico = this.servico.findIndex(servico => servico.getIdServico === idDeletar)

        if (indiceServico !== -1) {
            this.servico.splice(indiceServico, 1)
            console.log(`\Serviço com ID ${idDeletar} excluído com sucesso!\n`)
        } else {
            console.log(`\Serviço com ID ${idDeletar} não encontrado.\n`)
        }
    }
}