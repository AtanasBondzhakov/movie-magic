import movies from "../movies.js";

const getOne = (movieId) => movies.find(m => m.id === movieId);

export default {
    getOne
}