/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type BarraNavegacaoProps = {
    tema: string;
    botoes: string[];
    seletorView: (valor: string, event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const BarraNavegacao: FC<BarraNavegacaoProps> = ({ tema, botoes, seletorView }) => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const gerarListaBotoes = () => {
        if (botoes.length <= 0) {
            return <></>;
        } else {
            return botoes.map((valor) => (
                <li key={valor} className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => seletorView(valor, e)}>
                        {valor}
                    </a>
                </li>
            ));
        }
    };

    // UseEffect para atualizar o título da página com base na seleção
    useEffect(() => {
        document.title = `PetLovers - ${botoes[0] || 'Home'}`; // Exemplo de efeito
    }, [botoes]);

    // Toggle collapse de navegação
    const handleToggleNav = () => {
        setIsNavCollapsed(!isNavCollapsed);
    };

    return (
        <nav
            className="navbar navbar-expand-lg"
            data-bs-theme="light"
            style={{ backgroundColor: tema, marginBottom: 10 }}
        >
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">PetLovers</span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded={!isNavCollapsed ? 'true' : 'false'}
                    aria-label="Toggle navigation"
                    onClick={handleToggleNav}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`} id="navbarNav">
                    <ul className="navbar-nav">{gerarListaBotoes()}</ul>
                </div>
            </div>
        </nav>
    );
};

export default BarraNavegacao;
