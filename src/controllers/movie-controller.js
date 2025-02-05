import { Router } from "express";

import movieService from "../services/movie-service.js";
import castService from "../services/cast-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    res.render('create');
});

movieController.post('/create', isAuth, async (req, res) => {
    const movieData = req.body;
    const userId = req.user?.id;

    await movieService.create(movieData, userId);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean().populate('casts');

    const isOwner = movie.owner && movie.owner == req.user?.id;

    res.render('movie/details', { movie, isOwner });
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

movieController.get('/:movieId/attach-cast', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    const casts = await castService.getAll({ exclude: movie.casts });

    res.render('movie/attach-cast', { movie, casts });
});

movieController.post('/:movieId/attach-cast', isAuth, async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;
    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    if (movie.owner != req.user?.id) {
        return res.redirect('/404');
    }

    await movieService.remove(movieId);

    res.redirect('/');
});

movieController.get('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    const categories = getCategoriesViewData(movie.category);

    res.render('movie/edit', { movie, categories });
});

movieController.post('/:movieId/edit', async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;

    await movieService.edit(movieId, movieData);

    res.redirect(`/movies/${movieId}/details`);
});

function getCategoriesViewData(category) {
    const categoriesMap = {
        'tv-show': 'TV Show',
        'animation': 'Animation',
        'movie': 'Movie',
        'documentary': 'Documentary',
        'short-film': 'Short film'
    }

    const categories = Object.keys(categoriesMap).map(value => ({
        value,
        label: categoriesMap[value],
        selected: value === category ? 'selected' : '',
    }));

    return categories;
}

export default movieController;