const TitleRepository = require('../repositories/TitleRepository');
const TitleType = require('../constants/TitleType');
const MovieValidatior = require('../validations/MovieValidator');
const md5 = require('md5');
const path = require('path')

module.exports = {
  getAll: async () => await TitleRepository.getAll(),

  insert: async (title) => await TitleRepository.insert(title),

  getById: async (id) => await TitleRepository.getById(id),

  getAllGroupByCategory: async () => await TitleRepository.getAllGroupByCategory(),

  getByTypeAndCategory: async (type, category) => await TitleRepository.getByTypeAndCategory(type, category),

  getByType: async type => await TitleRepository.getByType(type),

  getAllMovies: async () => await TitleRepository.getByType(TitleType.MOVIE),

  getAllSeries: async () => await TitleRepository.getByType(TitleType.SERIE),

  getAllCategories: async () => await TitleRepository.getAllCategories(),

  search: async query => await TitleRepository.search(query),

  getFixedOnHome: async () => await TitleRepository.getFixedOnHome(),

  getRecents: async () => await TitleRepository.getRecents(),

  upload: async (file, dir) => {
    return new Promise((resolve, error) => {
      const filename = md5(new Date() + path.extname(file.name));

      file.mv(dir + filename, function(err) {
        if (err)
          error(err);
        resolve(filename);
      });
    });
  },

  save: async function(movie) {
    movie.tags = movie.tags.split(",").map((item) => item.trim());

    let validation = await MovieValidatior.save(movie);

    if (!validation.isValid) {
      return validation;
    }

    if (movie.fileImageCover && movie.fileImageCover.size) {
      movie.imageCoverFilename = await this.upload(movie.fileImageCover, 'public/uploads/covers/');
    }

    if (movie.fileVideo && movie.fileVideo.size) {
      movie.videoFileName = await this.upload(movie.fileVideo, 'public/uploads/movies/');
    }

    if (movie._id != null) {
      return await TitleRepository.update(movie);
    } else {
      return await TitleRepository.insert(movie);
    }
  }

}
