import Entrada from "../io/entrada"
import Produto from "../modelo/produto"
import Cadastro from "./cadastro"

export default class CadastroProduto extends Cadastro{
    private produto : Array<Produto>
    private entrada : Entrada
    private static idCounter: number = 1

    constructor(produto: Array<Produto> ){
        super()
        this.produto = produto
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\n Iníco do cadastro de Produtos`)
        let idprod = CadastroProduto.idCounter++
        let nomeprod = this.entrada.receberTexto(`Por favor informe o nome do produto:`)

        let valorprodInput = this.entrada.receberNumero(`Por favor informe o valor do produto:`)
        let valorprod = Number(valorprodInput); // Convert to number
        if (isNaN(valorprod)) {
            console.error("Valor inválido, não é um número.");
            return; // Exit the method if the value is not valid
        }

        let descricaoprod = this.entrada.receberTexto(`Por favor coloque uma breve descrição do produto:`)
        let tipoprod = this.entrada.receberTexto(`Por favor informe o tipo do produto:`)

        let produto = new Produto(idprod,nomeprod,valorprod,descricaoprod,tipoprod)

        this.produto.push(produto)
        console.log(`\nCadastro concluído,ID do produto: ${idprod}\n`)

    }

}
