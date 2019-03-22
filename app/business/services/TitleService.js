const TitleRepository = require('../repositories/TitleRepository');
const TitleType = require('../constants/TitleType');
const TitleValidator = require('../validations/TitleValidator');
const md5 = require('md5');
const path = require('path')

module.exports = {
  getAll: async () => await TitleRepository.getAll(),

  insert: async (title) => await TitleRepository.insert(title),

  getById: async (id) => await TitleRepository.getById(id),

  getAllGroupByCategory: async () => await TitleRepository.getAllGroupByCategory(),

  getByTypeAndCategory: async (type, category) => await TitleRepository.getByTypeAndCategory(type, category),

  getByType: async type => await TitleRepository.getByType(type),

  getEpisodeById: async (episodeId) => await TitleRepository.getEpisodeById(episodeId),

  getAllMovies: async () => await TitleRepository.getByType(TitleType.MOVIE),

  getAllSeries: async () => await TitleRepository.getByType(TitleType.SERIE),

  search: async query => await TitleRepository.search(query),

  getFixedOnHome: async () => await TitleRepository.getFixedOnHome(),

  getRecents: async () => await TitleRepository.getRecents(),

  setFixedOnHome: async (id) => await TitleRepository.setFixedOnHome(id),

  upload: async (file, dir) => {
    return new Promise((resolve, error) => {
      const filename = md5(new Date()) + path.extname(file.name);

      file.mv(dir + filename, function(err) {
        if (err)
          error(err);
        resolve(filename);
      });
    });
  },

  save: async function(title) {
    let validation = await TitleValidator.save(title);

    if (!validation.isValid) {
      return validation;
    }

    if (title.fileImageCover && title.fileImageCover.size) {
      title.imageCoverFilename = await this.upload(title.fileImageCover, 'public/uploads/covers/');
    }

    if (title.fileVideo && title.fileVideo.size) {
      title.videoFileName = await this.upload(title.fileVideo, 'public/uploads/movies');
    }

    console.log(title)

    if (title._id != null) {
      return await TitleRepository.update(title);
    } else {
      return await TitleRepository.insert(title);
    }
  },

}
