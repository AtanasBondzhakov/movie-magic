import { v4 as uuId } from 'uuid';

import movies from "../movies.js";

const getAll = (filter = {}) => {
    let result = movies;

    if (filter.title) {
        result = result.filter(movie => movie.title.toLowerCase().includes(filter.title.toLowerCase()));
    }

    if(filter.genre) {
        result = result.filter(movie => movie.genre.toLowerCase().includes(filter.genre.toLowerCase()));
    }

    if(filter.year) {
        result = result.filter(movie => movie.year === filter.year)
    }

    return result;
}
const getOne = (movieId) => movies.find(m => m.id === movieId);

const create = (movieData) => {
    const id = uuId();
    movies.push({
        id,
        ...movieData,
        rating: Number(movieData.rating)
    });

    return id;
};

export default {
    getAll,
    getOne,
    create
}