const TitleService = require('../../business/services/TitleService');

module.exports = {
  index: async (req, res) => {
    res.render('admin/serie/index.html', { series: await TitleService.getAllSeries() });
  },
}
