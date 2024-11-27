export const insertMaskInRG = (rg: string) => {
    // Remove caracteres não numéricos
    rg = rg.replace(/\D/g, '');

    // Aplica a máscara progressiva conforme o número de dígitos
    if (rg.length <= 2) {
        return rg;
    } else if (rg.length <= 5) {
        return rg.replace(/(\d{2})(\d+)/, '$1.$2');
    } else if (rg.length <= 8) {
        return rg.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
    } else {
        return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    }
};
