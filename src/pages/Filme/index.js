import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./filme-info.css";
import api from "../../services/api";

function Filme() {
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api
                .get(`movie/${id}`, {
                    params: {
                        api_key: "5598a03562ee49d8b64f4fc2b388f0cc",
                        language: "pt-BR",
                    },
                })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    console.log("Filme Não encontrado");
                });
        }

        loadFilme();

        return () => {
            console.log("Componente foi desmontado");
        };
    }, []);

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando Filme</h1>
            </div>
        );
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
                alt={filme.title}
            />

            <h3> Sinopse </h3>
            <span>{filme.overview}</span>

            <strong>Avaliações: {filme.vote_average} /10</strong>

            <div className="area-buttons">
                <button>Salvar</button>
                <button>
                    <a href="#">Trailer</a>
                </button>
            </div>
        </div>
    );
}

export default Filme;
