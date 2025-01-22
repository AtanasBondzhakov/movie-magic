import { Router } from "express";

import movieService from "../services/movie-service.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    const movieData = req.body;

    movieService.create(movieData);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    res.render('details', { movie });
});

movieController.get('/search', (req, res) => {
    const filter = req.query;
    const movies = movieService.getAll(filter);

    res.render('search', { movies, filter });
});

export default movieController;