const TitleService = require('../../business/services/TitleService');
const CategoryService = require('../../business/services/CategoryService');
const TitleType = require('../../business/constants/TitleType');

module.exports = {
  movies: async (req, res) => {
    res.render('admin/title/index.html', { TitleType: TitleType, type: TitleType.MOVIE, titles: await TitleService.getAllMovies() });
  },

  series: async (req, res) => {
    res.render('admin/title/index.html', { TitleType: TitleType, type: TitleType.SERIE, titles: await TitleService.getAllSeries() });
  },

  record: async (req, res) => {
    let title = await TitleService.getById(req.params.id);
    res.render('admin/title/record.html', { TitleType: TitleType, type: title != null ? title.type : req.query.type, categories: await CategoryService.getAll(), title });
  },

  save: async (req, res) => {
    let title = req.body;
    title.tags = title.tags.split(",").map((item) => item.trim());

    title.fileImageCover = req.files.fileImageCover;
    title.fileVideo = req.files.fileVideo;

    let saveTitle = await TitleService.save(title);

    if (saveTitle.errors) {
      res.render('admin/title/record.html', { title: req.body, errors: saveTitle.errors });
    } else {
      res.redirect(title.type == TitleType.MOVIE ? '/admin/movies' : '/admin/series');
    }
  },

  setFixedOnHome: async (req, res) => {
    await TitleService.setFixedOnHome(req.query.id);
    return res.redirect(req.headers.referer);
  },

  seasons: async (req, res) => {
    return res.render('admin/title/seasons.html', { title : await TitleService.getById(req.params.titleId) });
  },

  season : async (req, res) => {
    
    let season = {};

    if(req.params.id){
        season = await TitleService.getSeasonById(req.params.id);
    }

    return res.render('admin/title/season.html', { titleId: req.params.titleId, season });
  },

  saveSeason: async(req, res) => {
      let titleId = req.body.titleId;
      delete req.body.titleId;

      await TitleService.saveSeason(titleId, req.body);

      return res.redirect(`/admin/serie/${titleId}/seasons`)
  },

  removeSeason: async(req,res) => {
    season = await TitleService.removeSeason(req.params.titleId,req.params.id);
    return res.redirect(req.headers.referer)
  },

}
