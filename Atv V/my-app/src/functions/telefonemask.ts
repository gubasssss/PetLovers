export const insertMaskInTelefone = (telefone: string) => {
    // Remove caracteres não numéricos
    telefone = telefone.replace(/\D/g, '');

    // Aplica a máscara progressiva conforme o número de dígitos
    if (telefone.length <= 2) {
        return telefone; // DDD
    } else if (telefone.length <= 6) {
        return telefone.replace(/(\d{2})(\d+)/, '($1) $2'); // DDD + 5 primeiros dígitos
    } else if (telefone.length <= 10) {
        return telefone.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3'); // DDD + 5 + 4 dígitos
    } else if (telefone.length <= 11) {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // DDD + 6 + 4 dígitos
    }
    
    return telefone; // Retorna o valor sem máscara se exceder 11 dígitos
};
