import Deletar from "./deletar" 
import Entrada from "../io/entrada" 
import Produto from "../modelo/produto"

export default class DeletarProduto extends Deletar {
    private produto: Array<Produto>
    private entrada: Entrada

    constructor(produto: Array<Produto>) {
        super()
        this.produto = produto
        this.entrada = new Entrada()
    }

    public deleta(): void {
        console.log(`\nInício da exclusão do produto`)
        let idDeletar = this.entrada.receberNumero(`Por favor informe o número do ID do produto que deseja excluir: `)

        let indiceProduto = this.produto.findIndex(produto => produto.getIdProduto === idDeletar)

        if (indiceProduto !== -1) {
            this.produto.splice(indiceProduto, 1)
            console.log(`\Produto com ID ${idDeletar} excluído com sucesso!\n`)
        } else {
            console.log(`\Produto com ID ${idDeletar} não encontrado.\n`)
        }
    }
}