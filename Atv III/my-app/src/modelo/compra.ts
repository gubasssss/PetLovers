export default class Compra {
    public clienteCpf: string
    public itemId: number
    public tipoItem: 'produto' | 'servico' 
    
    constructor(clienteCpf: string, itemId: number, tipoItem: 'produto' | 'servico') {
        this.clienteCpf = clienteCpf
        this.itemId = itemId
        this.tipoItem = tipoItem
    }
}
