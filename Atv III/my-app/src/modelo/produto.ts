export default class Produto {
    public idprod:number
    public nomeprod!: string
    public valorprod:number
    public descricaoprod: string
    public tipoprod:string

    constructor(idprod:number,nomeprod: string,valorprod: number, descricaoprod: string,tipoprod: string){
        this.idprod = idprod
        this.nomeprod = nomeprod
        this.valorprod = valorprod
        this.descricaoprod = descricaoprod
        this.tipoprod = tipoprod
    }


    

    public get getIdProduto(){
        return this.idprod
    }

    public get getNomeProduto(){
        return this.nomeprod
    }

    public get getValorProduto(){
        return this.valorprod
    }

    public get getDescricaoProduto(){
        return this.descricaoprod
    }

    public get getTipoProduto(){
        return this.tipoprod
    }
}