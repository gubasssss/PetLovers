
export default class Telefone {
    public numero: string

    constructor( numero: string) {
        this.numero = numero
    }

    public get getNumero(): string{
        return this.numero
    }



}
