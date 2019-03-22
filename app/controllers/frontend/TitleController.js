const nunjucks = require('nunjucks');
const TitleService = require('../../business/services/TitleService');
const TitleType = require('../../business/constants/TitleType');
const CategoryService = require('../../business/services/CategoryService');

module.exports = {
  index: async (req, res) => {

    res.render('frontend/title/index.html', { model: await TitleService.getAllGroupByCategory(), fixedTitle: await TitleService.getFixedOnHome() });
  },

  series: async (req, res) => {
    let model = null;
    if (req.query.category == null) {
      model = { titles: await TitleService.getByType(TitleType.SERIE) };
    } else {
      model = { titles: await TitleService.getByTypeAndCategory(TitleType.SERIE, req.query.category) };
    }

    model.categories = await CategoryService.getAll();

    res.render('frontend/title/byType.html', model);
  },

  movies: async (req, res) => {
    let model = null;
    if (req.query.category == null) {
      model = { titles: await TitleService.getByType(TitleType.MOVIE) };
    } else {
      model = { titles: await TitleService.getByTypeAndCategory(TitleType.MOVIE, req.query.category) }
    }

    model.categories = await CategoryService.getAll();

    res.render('frontend/title/byType.html', model);

  },

  details: async (req, res) => {
    var model = {
      season: req.query.season,
      title: await TitleService.getById(req.query.id),
      recents: await TitleService.getRecents()
    };

    if (model.season) {
      model.episodes = model.title.seasons.find(x => x.number == model.season).episodes;
    } else {
      model.episodes = model.title.seasons.find(x => x.number == 1).episodes;
    }

    res.render('frontend/title/details.html', model);
  },

  play: async (req, res) => {
    res.render('frontend/title/player.html', { referer: req.headers.referer, title: req.query.ep ? await TitleService.getEpisodeById(req.query.ep) : await TitleService.getById(req.query.id) });
  },

  search: async (req, res) => {
    res.render('frontend/title/search.html', { q: req.body.q, titles: await TitleService.search(req.body.q) });
  },

  createAll: async (req, res) => {
    res.send(await TitleService.insertInitial());
  },

}
