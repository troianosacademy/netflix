const TitleService = require('../../business/services/TitleService');
const CategoryService = require('../../business/services/CategoryService');

module.exports = {
  index: async (req, res) => {
    res.render('admin/movie/index.html', { movies: await TitleService.getAllMovies() });
  },

  record: async (req, res) => {
    res.render('admin/movie/record.html', { categories: await CategoryService.getAll(), movie: await TitleService.getById(req.params.id) });
  },

  save: async (req, res) => {

    let movie = req.body;

    movie.fileImageCover = req.files.fileImageCover;
    movie.fileVideo = req.files.fileVideo;

    let saveMovie = await TitleService.save(movie);

    if (saveMovie.errors) {
      res.render('admin/movie/record.html', { movie: req.body, errors: saveMovie.errors });
    } else {
      res.redirect('/admin/movies');
    }
  },
}
