import Movie from '../models/Movie.js';

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

const create = (movieData, ownerId) => {
    const result = Movie.create({
        ...movieData,
        rating: Number(movieData.rating),
        year: Number(movieData.year),
        owner: ownerId
    });

    return result;
};

const attachCast = async (movieId, castId) => Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });

const remove = (movieId) => Movie.findByIdAndDelete(movieId);

const edit = (movieId, movieData) => Movie.findByIdAndUpdate(movieId, movieData);

export default {
    getAll,
    getOne,
    create,
    attachCast,
    remove,
    edit
}