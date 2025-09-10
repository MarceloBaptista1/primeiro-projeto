import { use, useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import "./filme-info.css";
import api from "../../services/api";

import { toast } from "react-toastify";

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

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
                    navigate("/", { replace: true });
                    return;
                });
        }

        loadFilme();

        return () => {
            console.log("Componente foi desmontado");
        };
    }, [navigate, id]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some(
            (filmesSalvos) => filmesSalvos.id === filme.id
        );

        if (hasFilme) {
            toast.warn("Esse filme já está na sua lista!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");
    }

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
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a
                        target="blank"
                        rel="external"
                        href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
                    >
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;
