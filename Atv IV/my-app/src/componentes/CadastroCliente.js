import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import '../index.css';

export default function FormularioCadastroCliente() {
    const [formData, setFormData] = useState({
        nome: '',
        nomeSocial: '',
        email: '',
        endereco: {
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: '',
            codigoPostal: '',
            informacoesAdicionais: ''
        },
        telefones: [
            {
                numero:'',
                ddd:'',
            }
        ]
    });

    const [errors, setErrors] = useState({
        nome: '',
        nomeSocial: '',
        email: '',
        endereco: {
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: '',
            codigoPostal: '',
            informacoesAdicionais: ''
        },
        telefones: [
            {
                numero:'',
                ddd:'',
            }
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name.startsWith('endereco.')) {
            const fieldName = name.split('.')[1]; // Extrair o nome do campo após "endereco."
            setFormData({
                ...formData,
                endereco: {
                    ...formData.endereco,
                    [fieldName]: value,
                }
            });
        } else if (name.startsWith('telefones.')) {
            const fieldName = name.split('.')[1];
            setFormData({
                ...formData,
                telefones: [{
                    ...formData.telefones[0],
                    [fieldName]: value,
                }]
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        setErrors({ ...errors, [name]: '' }); // Limpar erro para o campo atualizado
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validação
        let validationErrors = {};
    
        // Verifique todos os campos obrigatórios
        if (!formData.nome) validationErrors.nome = 'O nome é obrigatório';
        if (!formData.email) validationErrors.email = 'O e-mail é obrigatório';
        if (!formData.telefones[0].numero) {
            validationErrors.telefones = [{ ...validationErrors.telefones[0], numero: 'O telefone é obrigatório' }];
        }        if (!formData.endereco.estado) validationErrors.endereco = { ...validationErrors.endereco, estado: 'O estado é obrigatório' };
    
        // Se houver erros de validação, não envie o formulário
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Exibe erros de validação
            return;
        }
    
        // Enviar os dados
        axios.post('http://localhost:32831/cliente/cadastrar', formData)
            .then(response => {
                alert('Cadastrado com sucesso');
                console.log('Cliente cadastrado com sucesso:', response.data);
                setFormData({
                    nome: '',
                    nomeSocial: '',
                    email: '',
                    endereco: {
                        estado: '',
                        cidade: '',
                        bairro: '',
                        rua: '',
                        numero: '',
                        codigoPostal: '',
                        informacoesAdicionais: ''
                    },
                    telefones: [{
                        numero: '',
                        ddd: '',
                    }]
                });
            })
            .catch(error => {
                console.error('Erro ao cadastrar cliente:', error);
                alert('Erro ao cadastrar cliente. Tente novamente mais tarde.');
            });
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className={`inputscadastrocliente ${errors.nome ? 'input-error' : ''}`}
                        placeholder="Nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                    />
                    {errors.nome && <div className="error-message" style={{ marginLeft: "430px" }}>{errors.nome}</div>}
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="inputscadastrocliente"
                        placeholder="Nome Social (Opcional)"
                        name="nomeSocial"
                        value={formData.nomeSocial}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className={`inputscadastrocliente ${errors.email ? 'input-error' : ''}`}
                        placeholder="E-mail"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <div className="error-message" style={{ marginLeft: "430px" }}>{errors.email}</div>}
                </div>
                <div className="mb-3">
                <InputMask
                     mask="99999-9999"
                     className={`inputscadastrocliente ${errors.telefone ? 'input-error' : ''}`}
                     placeholder="Telefone"
                    name="telefones.numero"
                    value={formData.telefones[0].numero} // Observe o acesso a telefones[0]
                    onChange={handleInputChange}
/>
{errors.telefones[0]?.numero && <div className="error-message" style={{ marginLeft: "430px" }}>{errors.telefones[0].numero}</div>}
                </div>

                <div className="mb-3">
                <InputMask
    mask="99"
    className={`inputscadastrocliente`}
    placeholder="DDD"
    name="telefones.ddd"
    value={formData.telefones[0].ddd}
    onChange={handleInputChange}
/>
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        className={`inputscadastrocliente ${errors.endereco.estado ? 'input-error' : ''}`}
                        placeholder="Estado"
                        name="endereco.estado"
                        value={formData.endereco.estado}
                        onChange={handleInputChange}
                    />
                    {errors.endereco.estado && <div className="error-message" style={{ marginLeft: "430px" }}>{errors.endereco.estado}</div>}
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className={`inputscadastrocliente ${errors.endereco.cidade ? 'input-error' : ''}`}
                        placeholder="Cidade"
                        name="endereco.cidade"
                        value={formData.endereco.cidade}
                        onChange={handleInputChange}
                    />
                    {errors.endereco.cidade && <div className="error-message" style={{ marginLeft: "430px" }}>{errors.endereco.cidade}</div>}
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className={`inputscadastrocliente ${errors.endereco.bairro ? 'input-error' : ''}`}
                        placeholder="Bairro"
                        name="endereco.bairro"
                        value={formData.endereco.bairro}
                        onChange={handleInputChange}
                    />
                    {errors.endereco.bairro && <div className="error-message" style={{ marginLeft: "430px" }}>{errors.endereco.bairro}</div>}
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className={`inputscadastrocliente ${errors.endereco.rua ? 'input-error' : ''}`}
                        placeholder="Rua"
                        name="endereco.rua"
                        value={formData.endereco.rua}
                        onChange={handleInputChange}
                    />
                    {errors.endereco.rua && <div className="error-message" style={{ marginLeft: "430px" }}>{errors.endereco.rua}</div>}
                </div>
                <div className="mb-3">
                <input
                        type="text"
                        className={`inputscadastrocliente ${errors.endereco.numero ? 'input-error' : ''}`}
                        placeholder="Número"
                        name="endereco.numero"
                        value={formData.endereco.numero}
                        onChange={handleInputChange}
                    />
                    {errors.endereco.numero && <div className="error-message" style={{ marginLeft: "430px" }}>{errors.endereco.numero}</div>}
                </div>



                <div className="mb-3">
                <InputMask
                        mask="99999-999"
                        type="text"
                        className={`inputscadastrocliente ${errors.endereco.codigoPostal ? 'input-error' : ''}`}
                        placeholder="Código Postal"
                        name="endereco.codigoPostal"
                        value={formData.endereco.codigoPostal}
                        onChange={handleInputChange}
                    />
                    {errors.endereco.codigoPostal && <div className="error-message" style={{ marginLeft: "430px" }}>{errors.endereco.codigoPostal}</div>}
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="inputscadastrocliente"
                        placeholder="Informações adicionais (Opcional)"
                        name="endereco.informacoesAdicionais"
                        value={formData.endereco.informacoesAdicionais}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginLeft: "430px" }}>Cadastrar</button>
            </form>
        </div>
    );
}
