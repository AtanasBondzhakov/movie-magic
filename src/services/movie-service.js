import { v4 as uuId } from 'uuid';

import movies from "../movies.js";

const getAll = () => movies;

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