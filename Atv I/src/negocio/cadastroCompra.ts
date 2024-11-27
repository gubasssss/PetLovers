import Entrada from "../io/entrada"
import Empresa from "../modelo/empresa"
import Cliente from "../modelo/cliente"
import Produto from "../modelo/produto"
import Servico from "../modelo/servico"
import Compra from "../modelo/compra"

export default class CadastroCompra {
    private empresa: Empresa
    private entrada: Entrada

    constructor(empresa: Empresa) {
        this.empresa = empresa
        this.entrada = new Entrada()
    }

    public cadastrarCompra(): void {
        console.log(`\nInício do cadastro de compra.`)

        let cpfCliente = this.entrada.receberTexto(`Informe o CPF do cliente: `)
        let cliente = this.empresa.getClientes.find(cliente => cliente.getCpf.getValor === cpfCliente)

        if (cliente) {
            console.log(`\nCliente encontrado: ${cliente.nome}\n`)

            let opcaoItem = this.entrada.receberNumero(`Deseja comprar um Produto (1) ou um Serviço (2)? `)

            if (opcaoItem === 1) {
                console.log(`\nProdutos disponíveis:`)
                this.empresa.getProdutos.forEach(produto => {
                    console.log(`ID: ${produto.getIdProduto} - Nome: ${produto.nomeprod} - Valor: ${produto.valorprod}`)
                })

                let idProduto = this.entrada.receberNumero(`Informe o ID do produto desejado: `)
                let produto = this.empresa.getProdutos.find(p => Number(p.getIdProduto) === idProduto)

                if (produto) {
                    let novaCompra = new Compra(cliente.getCpf.getValor, produto.getIdProduto, 'produto')
                    cliente.adicionarCompra(novaCompra)
                    console.log(`\nCompra registrada com sucesso! Produto: ${produto.nomeprod}`)
                } else {
                    console.log(`Produto não encontrado.`)
                }

            } else if (opcaoItem === 2) {
                console.log(`\nServiços disponíveis:`)
                this.empresa.getServicos.forEach(servico => {
                    console.log(`ID: ${servico.getIdServico} - Nome: ${servico.nomesserv} - Valor: ${servico.valorserv}`)
                })

                let idServico = this.entrada.receberNumero(`Informe o ID do serviço desejado: `)
                let servico = this.empresa.getServicos.find(s => Number (s.getIdServico) === idServico)

                if (servico) {
                    let novaCompra = new Compra(cliente.getCpf.getValor, servico.getIdServico, 'servico')
                    cliente.adicionarCompra(novaCompra)
                    console.log(`\nCompra registrada com sucesso! Serviço: ${servico.nomesserv}`)
                } else {
                    console.log(`Serviço não encontrado.`)
                }

            } else {
                console.log(`Opção inválida.`)
            }

        } else {
            console.log(`Cliente com CPF ${cpfCliente} não encontrado.`)
        }
    }
}
