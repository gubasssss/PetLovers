import Entrada from "../io/entrada"
import Empresa from "../modelo/empresa"
import CadastroCliente from "../negocio/cadastroCliente"
import ListagemClientes from "../negocio/listagemCliente"
import DeletarCliente from "../negocio/deletarCliente"   
import AtualizarCliente from "../negocio/atualizarCliente"
import CadastroProduto from "../negocio/cadastroProduto"
import CadastroServico from "../negocio/cadastroServico"
import ListagemProduto from "../negocio/listagemProduto"
import ListagemServico from "../negocio/listagemServico"
import AtualizarProduto from "../negocio/atualizarProduto"
import AtualizarServico from "../negocio/atualizarServico"
import DeletarProduto from "../negocio/deletarProduto"
import DeletarServico from "../negocio/deletarServico"
import CadastroCompra from "../negocio/cadastroCompra"
import ListarCompras from "../negocio/listagemCompra"

        
console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`)

let empresa = new Empresa()
let execucao = true
let entrada = new Entrada()


while(execucao){
    console.log(`Opções:`)
    console.log(`1 - Cadastro de Clientes`)
    console.log(`2 - Cadastro de Produtos/Serviços`)
    console.log(`3 - Consumo de Clientes`)
    console.log(`0 - Sair`)
    

    let opcao = entrada.receberNumero(`Por favor,escolha uma opção:`)

    switch(opcao){
        case 1:
            let operacaoCliente = true
            while (operacaoCliente) {
            console.log(`Opções:`)
            console.log(`1 - Cadastrar cliente`)
            console.log(`2 - Listar todos os clientes`)
            console.log(`3 - Excluir Cliente`)
            console.log(`4 - Atualizar Cliente`)
            console.log(`0 - Sair para o menu principal`)

            let escolha = entrada.receberNumero(`Por favor, escolha uma opção: `)

            switch (escolha) {
                case 1:
                    let cadastro = new CadastroCliente(empresa.getClientes)
                    cadastro.cadastrar()
                    break

                case 2:

                    let listagem = new ListagemClientes(empresa.getClientes)
                    listagem.listar()
                    break

                case 3:
                    let deletar = new DeletarCliente(empresa.getClientes)
                    deletar.deleta()
                    break

                case 4:
                    let atualizar = new AtualizarCliente(empresa.getClientes)
                    atualizar.atualizar()
                    break 
                
                case 0:
                    operacaoCliente= false
                    break

                default:
                    console.log(`Operação não entendida :`)

        

            }
        }
        break



case 2:

    let operacaoProduto = true
    while(operacaoProduto){
        console.log(`Opções:`)
        console.log(`1-Cadastrar Produtos ou Serviços`)
        console.log(`2-Listar Produtos e Serviços`)
        console.log(`3-Atualizar Produtos ou Serviços`)
        console.log(`4-Deletar Produtos ou Serviços`)
        console.log(`0-Sair`)

        let escolhaProduto = entrada.receberNumero(`Por favor,escolha um opção:`)

        switch(escolhaProduto){
            case 1:

                let cadastrarprod = true
                while(cadastrarprod){
                    console.log(`Opções:`)
                    console.log(`1-Produto`)
                    console.log(`2-Serviço`)
                    console.log(`0-Sair`)

                    let escolhacadastprod = entrada.receberNumero(`Escolha Produto ou Serviço:`)

                    switch(escolhacadastprod){
                        case 1:
                            let cadastroprod = new CadastroProduto(empresa.getProdutos)
                            cadastroprod.cadastrar()
                            break
                        
                        case 2:
                            let cadastroserv= new CadastroServico(empresa.getServicos)
                            cadastroserv.cadastrar()
                            break
                        
                        case 0:
                            cadastrarprod = false
                            break

                        default:
                            console.log(`Operação não entendida`)
                    }
                    
                }
                break

            case 2:
                let listopc = true
                while(listopc){
                    console.log(`Opções:`)
                    console.log(`1-Produto`)
                    console.log(`2-Serviço`)
                    console.log(`0-Sair`)

                    let escolhacadastprod = entrada.receberNumero(`Escolha Produto ou Serviço:`)

                    switch(escolhacadastprod){


                        case 1:
                            let listprod = new ListagemProduto(empresa.getProdutos)
                            listprod.listar()
                            break
                        
                        case 2:
                            let listserv= new ListagemServico(empresa.getServicos)
                            listserv.listar()
                            break
                        
                        case 0:
                            listopc = false
                            break

                        default:
                            console.log(`Operação não entendida`)
                    }
                    
                }
                break
            
            case 3:
                let attopc = true
                while(attopc){
                    console.log(`Opções:`)
                    console.log(`1-Produto`)
                    console.log(`2-Serviço`)
                    console.log(`0-Sair`)

                    let escolhacadastprod = entrada.receberNumero(`Escolha Produto ou Serviço:`)

                    switch(escolhacadastprod){
                        case 1:
                            let attprod = new AtualizarProduto(empresa.getProdutos)
                            attprod.atualizar()
                            break
                        
                        case 2:
                            let attserv= new AtualizarServico(empresa.getServicos)
                            attserv.atualizar()
                            break
                        
                        case 0:
                            attopc = false
                            break

                        default:
                            console.log(`Operação não entendida`)
                    }
                    
                }
                break

            case 4:
                let delopc = true
                while(delopc){
                    console.log(`Opções:`)
                    console.log(`1-Produto`)
                    console.log(`2-Serviço`)
                    console.log(`0-Sair`)

                    let escolhacadastprod = entrada.receberNumero(`Escolha Produto ou Serviço:`)

                    switch(escolhacadastprod){
                        case 1:
                            let delprod = new DeletarProduto(empresa.getProdutos)
                            delprod.deleta()
                            break
                        
                        case 2:
                            let delserv= new DeletarServico(empresa.getServicos)
                            delserv.deleta()
                            break
                        
                        case 0:
                            delopc = false
                            break

                        default:
                            console.log(`Operação não entendida`)
                    }
                    
                }
                break
            
            case 0:
                operacaoProduto=false
                break
            
            default:
                console.log(`Operação não entendida`)
        }
    }
    break

    case 3:

    let consumoCliente = true
    while (consumoCliente){
        console.log(`Opções:`)
        console.log(`1-Cadastrar Compra de Produto ou Serviço`)
        console.log(`2-Ver Compras`)
        console.log(`3-Ver Listas`)
        console.log(`0-Sair para o menu principal`)

        let escolhaConsumo = entrada.receberNumero(`Por favor,escolha uma opção:`)

        switch(escolhaConsumo){
            case 1:
                let cadastrarCompra= new CadastroCompra(empresa)
                cadastrarCompra.cadastrarCompra()
                break
    
            case 2:
                let listarCompra = new ListarCompras(empresa.getClientes,empresa)
                listarCompra.listarCompra()
                break
            
            case 3:
                let listarOpcoes = new ListarCompras(empresa.getClientes,empresa)
                let verListagens = true
                while (verListagens) {
                    console.log(`Opções:`)
                    console.log(`1 - Top 10 Clientes por Quantidade`)
                    console.log(`2 - Serviços ou Produtos mais Consumidos`)
                    console.log(`3 - Serviços ou Produtos mais Consumidos por Tipo de Pet`)
                    console.log(`4 - Serviços ou Produtos mais Consumidos por Raça de Pet`)
                    console.log(`5 - Top 5 Clientes por Valor Consumido`)
                    console.log(`0 - Voltar`)

                    let escolhaListagem = entrada.receberNumero(`Por favor, escolha uma opção: `)

                    switch (escolhaListagem) {
                        case 1:
                            listarOpcoes.listarTop10ClientesPorQuantidade()
                            break
                        case 2:
                            listarOpcoes.listarMaisConsumidos()
                            break
                        case 3:
                            listarOpcoes.listarPorTipo()
                            break
                        case 4:
                            listarOpcoes.listarPorRaca()
                            break
                        case 5:
                            listarOpcoes.listarTop5ClientesPorCompras()
                            break
                        case 0:
                            verListagens = false 
                            break
                        default:
                            console.log(`Operação não entendida:`)
                    }
                }
                break
                

            case 0:
                consumoCliente = false
                break
                
            default:
                console.log(`Operação não entendida:`)
        }
    }
    break


case 0:
    execucao = false
    console.log(`Até Mais`)
    break   
    
default:
    console.log(`Opção não reconhecida `)
}
}
