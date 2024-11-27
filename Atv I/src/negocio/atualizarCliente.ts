import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import Atualizar from "./atualizar"

export default class AtualizarCliente extends Atualizar {
    private clientes: Array<Cliente>
    private entrada: Entrada

    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }



    public atualizar(): void {
        console.log(`\nInício da atualização do cliente`)
        let cpfAtualizar = this.entrada.receberTexto(`Por favor informe o número do CPF do cliente que deseja atualizar: `)

        let clienteEncontrado = this.clientes.find(cliente => cliente.getCpf.getValor === cpfAtualizar)

        if (clienteEncontrado) {
            console.log(`\nCliente encontrado! Por favor, insira as novas informações.\n`)

            let novoNome = this.entrada.receberTexto(`Por favor informe o novo nome do cliente (ou pressione Enter para manter o nome atual): `)
            let desejaNomeSocial = this.entrada.receberTexto(`Deseja informar o nome social? (S/N): `)
            let novoNomeSocial = ""
            if (desejaNomeSocial.toLowerCase() === 's') {
                novoNomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
            }             
            let novoemail = this.entrada.receberTexto(`Por favor informe o novo email (ou pressione Enter para manter o email atual):`) 
            let novoNumeroRG = this.entrada.receberTexto(`Por favor informe o novo RG (ou pressione Enter para manter o RG atual):`)
            let novoDDD = this.entrada.receberTexto(`Por favor informe o novo DDD (ou pressione Enter para manter o DDD atual):`)
            let novoNumero = this.entrada.receberTexto(`Por favor informe o novo numero (ou pressione Enter para manter o numero atual):`)



            if (novoNome) clienteEncontrado.nome = novoNome
            if (novoNomeSocial) clienteEncontrado.nomeSocial = novoNomeSocial
            if (novoemail) clienteEncontrado.email= novoemail
            if (novoNumeroRG) clienteEncontrado.rg.valorrg = novoNumeroRG
            if (novoDDD)clienteEncontrado.telefone.ddd = novoDDD
            if (novoNumero)clienteEncontrado.telefone.numero = novoNumero

            if (clienteEncontrado.pet.length > 1) {
                console.log(`\nO cliente possui múltiplos pet.`)
                clienteEncontrado.pet.forEach((pet, index) => {
                    console.log(`${index + 1}. Nome: ${pet.nome}, Tipo: ${pet.tipo}, Raça: ${pet.raca}, Gênero: ${pet.genero}`)
                })

                let indicePet = parseInt(this.entrada.receberTexto(`Informe o número do pet que deseja atualizar (ou pressione Enter para pular a atualização de pets): `)) - 1
                if (!isNaN(indicePet) && indicePet >= 0 && indicePet < clienteEncontrado.pet.length) {
                    let petSelecionado = clienteEncontrado.pet[indicePet]

                    let novoNomePet = this.entrada.receberTexto(`Por favor informe o novo nome do pet (ou pressione Enter para manter o nome atual): `)
                    let novoTipoPet = this.entrada.receberTexto(`Por favor informe o novo tipo de pet (ou pressione Enter para manter o tipo atual): `)
                    let novaRacaPet = this.entrada.receberTexto(`Por favor informe a nova raça do pet (ou pressione Enter para manter a raça atual): `)
                    let novoGeneroPet = this.entrada.receberTexto(`Por favor informe o novo gênero do pet (ou pressione Enter para manter o gênero atual): `)

                    if (novoNomePet) petSelecionado.nome = novoNomePet
                    if (novoTipoPet) petSelecionado.tipo = novoTipoPet
                    if (novaRacaPet) petSelecionado.raca = novaRacaPet
                    if (novoGeneroPet) petSelecionado.genero = novoGeneroPet
                }
            } else if (clienteEncontrado.pet.length === 1) {
                // Caso tenha apenas um pet, atualiza diretamente
                let petelecionado = clienteEncontrado.pet[0]

                let novoNomePet = this.entrada.receberTexto(`Por favor informe o novo nome do pet (ou pressione Enter para manter o nome atual): `)
                let novoTipoPet = this.entrada.receberTexto(`Por favor informe o novo tipo de pet (ou pressione Enter para manter o tipo atual): `)
                let novaRacaPet = this.entrada.receberTexto(`Por favor informe a nova raça do pet (ou pressione Enter para manter a raça atual): `)
                let novoGeneroPet = this.entrada.receberTexto(`Por favor informe o novo gênero do pet (ou pressione Enter para manter o gênero atual): `)

                if (novoNomePet) petelecionado.nome = novoNomePet
                if (novoTipoPet) petelecionado.tipo = novoTipoPet
                if (novaRacaPet) petelecionado.raca = novaRacaPet
                if (novoGeneroPet) petelecionado.genero = novoGeneroPet
            }

            console.log(`\nAtualização concluída com sucesso!\n`)
        } else {
            console.log(`\nCliente com CPF ${cpfAtualizar} não encontrado.\n`)  
        }
    }
}