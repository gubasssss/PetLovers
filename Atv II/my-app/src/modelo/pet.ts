export default class Pet {
    static map(arg0: (pet: any, index: any) => JSX.Element): import("react").ReactNode {
        throw new Error("Method not implemented.")
    }
    public nome: string
    public tipo: string
    public raca: string
    public genero: string

    constructor(nome: string, raca: string, genero: string, tipo: string) {
        this.nome = nome
        this.raca = raca
        this.genero = genero
        this.tipo = tipo
    }

    public get getNome(){
        return this.nome
    }

    public get getRaca(){
        return this.raca
    }

    public get getGenero(){
        return this.genero
    }

    public get getTipo(){
        return this.tipo
    }

}