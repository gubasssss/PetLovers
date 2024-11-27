import { useEffect, useState } from "react";
import ElementoListaCliente from "./elementoListaCliente";
import axios from "axios";

export default function ListaCliente(props) {
    let tema = props.tema;
    const [data, setData] = useState([]);
    const getClientes = () => {
        let url = 'http://localhost:32831/cliente/clientes';
        axios.get(url)
        .then(response => {
        })
        .catch(found => {
            setData(found.response.data);
            console.log(found.response.data[0]);
        });
    };
    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div className="container-fluid">
            <h1>Clientes</h1>
            <table className="table">
                <thead>
                    <tr>

                    </tr>
                </thead>
                <tbody>
                    {data.map(element => (
                        <ElementoListaCliente
                            key={element.id}
                            onUpdate={getClientes}
                            tema={tema}
                            id={element.id}
                            nome={element.nome}
                            nomeSocial={element.nomeSocial}
                            email={element.email}
                            endereco={element.endereco}
                            telefones={element.telefones}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
