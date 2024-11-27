import Deletar from "./deletar"
import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"

export default class DeletarCliente extends Deletar {
    private clientes: Array<Cliente>
    private entrada: Entrada

    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }

    public deleta(): void {
        console.log(`\nInício da exclusão do cliente`)
        let cpfDeletar = this.entrada.receberTexto(`Por favor informe o número do CPF do cliente que deseja excluir: `)

        let indiceCliente = this.clientes.findIndex(cliente => cliente.getCpf.getValor === cpfDeletar)

        if (indiceCliente !== -1) {
            this.clientes.splice(indiceCliente, 1)
            console.log(`\nCliente com CPF ${cpfDeletar} excluído com sucesso!\n`)
        } else {
            console.log(`\nCliente com CPF ${cpfDeletar} não encontrado.\n`)
        }
    }
}