/* eslint-disable jsx-a11y/anchor-is-valid */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function BarraNavegacao(props) {
    const gerarListaBotoes = () => {
        if (props.botoes.length <= 0) {
            return <></>;
        } else {
            let lista = props.botoes.map((valor) => (
                <li key={valor} className="nav-item">
                    <a
                        className="nav-link px-3 py-2 text-light rounded mx-1"
                        href="#"
                        style={{ transition: "0.3s", backgroundColor: "#007bff" }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
                        onClick={(e) => props.seletorView(valor, e)}
                    >
                        {valor}
                    </a>
                </li>
            ));
            return lista;
        }
    };

    let tema = props.tema || "#343a40"; // Cor padrão (escuro) se o tema não for passado.
    return (
        <nav
            className="navbar navbar-expand-lg"
            data-bs-theme="light"
            style={{
                backgroundColor: tema,
                marginBottom: 10,
                padding: "10px 20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
        >
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    {/* justify-content-center centraliza os botões horizontalmente */}
                    <ul className="navbar-nav">
                        {gerarListaBotoes()}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
