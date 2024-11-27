import Listagem from "./listagem"
import Servico from "../modelo/servico"
import * as fs from 'fs'

export default class ListagemServico extends Listagem {
    private servico: Array<Servico>
    constructor(servico: Array<Servico>) {
        super()
        this.servico = servico

        this.carregarServicoPredefinidos()

    }

    private carregarServicoPredefinidos():void{
        const dadosPredefinidos = JSON.parse(fs.readFileSync('src/modelo/servico.json','utf-8'))

        dadosPredefinidos.servico.forEach((servicoData:any)=>{
            const servico = new Servico(
                servicoData.idserv,
                servicoData.nomeserv,
                servicoData.valorserv,
                servicoData.descricaoserv,
                servicoData.tiposerv
            )
            this.servico.push(servico)
        })
    }

    public listar(): void {
        console.log(`\nLista de todos os Serviços:`)
        this.servico.forEach(servico => {
            console.log(`ID:` + servico.getIdServico)
            console.log(`Nome: ` + servico.getNomeServico)
            console.log(`Valor: ` + servico.getValorServico)
            console.log(`Descrição: ` + servico.getDescricaoServico)
            console.log(`Tipo:`+ servico.getTipoServico)
            console.log(`--------------------------------------`)
        });
        console.log(`\n`)
    }
}
