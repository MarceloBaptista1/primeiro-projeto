// https://api.themoviedb.org/3/movie/now_playing?api_key=5598a03562ee49d8b64f4fc2b388f0cc&language=pt-BR

// BASE DA URL: https://api.themoviedb.org/3/

import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});

export default api;
