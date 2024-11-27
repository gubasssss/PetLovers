export default class Servico {
    public idserv:number
    public nomesserv!: string
    public valorserv:number
    public descricaoserv: string
    public tiposerv:string

    constructor(idserv:number,nomeserv: string,valorserv: number, descricaoserv: string,tiposerv: string){
        this.idserv = idserv
        this.nomesserv = nomeserv
        this.valorserv = valorserv
        this.descricaoserv = descricaoserv
        this.tiposerv = tiposerv
    }

    public get getIdServico(){
        return this.idserv
    }

    public get getNomeServico(){
        return this.nomesserv
    }

    public get getValorServico(){
        return this.valorserv
    }

    public get getDescricaoServico(){
        return this.descricaoserv
    }

    public get getTipoServico(){
        return this.tiposerv
    }

    
}