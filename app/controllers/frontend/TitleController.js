const nunjucks = require('nunjucks');
const TitleService = require('../../business/services/TitleService');
const TitleType = require('../../business/constants/TitleType');

module.exports = {
  index: async (req, res) => {

    res.render('frontend/title/index.html', { model: await TitleService.getAllGroupByCategory(), fixedTitle: await TitleService.getFixedOnHome() });
  },

  series: async (req, res) => {
    let model = null;
    if (req.query.category == null) {
      model = { titles: await TitleService.getByType(TitleType.SERIE) };
    } else {
      model = { titles: await TitleService.getByTypeAndCategory(TitleType.SERIE, req.query.category) }
    }

    model.categories = await TitleService.getAllCategories();

    res.render('frontend/title/byType.html', model);
  },

  movies: async (req, res) => {
    let model = null;
    if (req.query.category == null) {
      model = { titles: await TitleService.getByType(TitleType.MOVIE) };
    } else {
      model = { titles: await TitleService.getByTypeAndCategory(TitleType.MOVIE, req.query.category) }
    }

    model.categories = await TitleService.getAllCategories();

    res.render('frontend/title/byType.html', model);

  },

  details: async (req, res) => {
    res.render('frontend/title/details.html', { title: await TitleService.getById(req.query.id), recents: await TitleService.getRecents() });
  },

  play: async (req, res) => {
    res.render('frontend/title/player.html', { title: await TitleService.getById(req.query.id) });
  },

  search: async (req, res) => {
    res.render('frontend/title/search.html', { q: req.body.q, titles: await TitleService.search(req.body.q) });
  },

  createAll: async (req, res) => {
    res.send(await TitleService.insertInitial());
  },

}
