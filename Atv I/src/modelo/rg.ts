export default class RG {
    public valorrg: string
    public dataEmissaorg: Date
    constructor(valorrg: string, dataEmissaorg: Date) {
        this.valorrg = valorrg
        this.dataEmissaorg = dataEmissaorg
    }
    public get getValorrg(): string {
        return this.valorrg
    }
    public get getDataEmissaorg(): Date {
        return this.dataEmissaorg
    }
}