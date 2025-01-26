import Movie from '../models/Movie.js';

import movies from "../movies.js";

const getAll = (filter = {}) => {
    let query = Movie.find();

    if (filter.title) {
        //TODO: fix to case insensitive
        query = query.find({ title: filter.search });
    }

    if (filter.genre) {
        query = query.find({ genre: filter.genre });
    }

    if (filter.year) {
        query = query.find({ year: Number(filter.year) });
    }

    return query;
}
const getOne = (movieId) => Movie.findById(movieId);

const create = (movieData) => {
        ...movieData,
    });

};

export default {
    getAll,
    getOne,
    create
}