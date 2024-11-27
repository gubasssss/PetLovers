
import CPF from "./cpf"
import Pet from "./pet"
import RG from "./rg"
import Telefone from "./telefone"
import Compra from "./compra"

export default class Cliente {
    public nome: string
    public nomeSocial: string
    public email:string
    public pet: Array<Pet>
    public telefone:Telefone
    public rg: RG
    private cpf: CPF
    private dataCadastro: Date
    public compras:Array<Compra>
    constructor(nome: string, nomeSocial: string,email: string, cpf: CPF, telefone: Telefone , pet:Array<Pet> , rg:RG, compras:Array<Compra>) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.email= email
        this.cpf = cpf
        this.rg = rg
        this.dataCadastro = new Date()
        this.telefone = telefone
        this.pet = pet
        this.compras = compras || []
    }

    public compraCliente():Array<Compra>{
        return this.compras
    }
    public nomeCliente():string{
        return this.nome
    }
    public get getEmail():string{
        return this.email
    }
    public get getCpf(): CPF {
        return this.cpf
    }
    public get getRgs():RG {
        return this.rg
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro
    }
    public get getTelefones(): Telefone {
        return this.telefone
    }
    public get getPets(): Array<Pet>{
        return this.pet
    }
    public adicionarCompra(compras:Compra): void{
        this.compras.push(compras)
    }
    public getCompras():Array<Compra>{
        return this.compras
    }

}