import Entrada from "../io/entrada"
import Atualizar from "./atualizar"
import Produto from "../modelo/produto"


export default class AtualizarProduto extends Atualizar {
    private produto: Array<Produto>
    private entrada: Entrada

    constructor(produto: Array<Produto>) {
        super()
        this.produto = produto
        this.entrada = new Entrada()
    }



    public atualizar(): void {
        console.log(`\nInício da atualização do produto`)
        let idAtualizar = this.entrada.receberNumero(`Por favor informe o número do ID do produto que deseja atualizar: `)

        let produtoEncontrado = this.produto.find(produto => produto.getIdProduto    === idAtualizar)

        if (produtoEncontrado) {
            console.log(`\Produto encontrado! Por favor, insira as novas informações.\n`)

            let novoNome = this.entrada.receberTexto(`Por favor informe o novo nome do produto (ou pressione Enter para manter o nome atual): `)
            let novoValorInput = this.entrada.receberTexto(`Por favor informe o novo valor do produto (ou pressione Enter para manter o valor atual): `)
            let novoValor = novoValorInput ? Number(novoValorInput) : undefined; // Convert to number

            // Check if the conversion is valid
            if (novoValorInput && isNaN(novoValor)) {
                console.error("Valor inválido, não é um número.");
                return; // Exit the method if the value is not valid
            }            
            let novaDescricao = this.entrada.receberTexto(`Por favor informe a nova descrição (ou pressione Enter para manter a descrição atual):`)
           
            if (novoNome) produtoEncontrado.nomeprod = novoNome
            if (novoValor) produtoEncontrado.valorprod = novoValor
            if (novaDescricao) produtoEncontrado.descricaoprod = novaDescricao
   

            console.log(`\nAtualização concluída com sucesso!\n`)
        } else {
            console.log(`\Produto com ID ${idAtualizar} não encontrado.\n`)  
        }
    }
}