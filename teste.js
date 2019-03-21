const mongoose = require('./config/mongoose');
const { port, env } = require('./config/vars');

mongoose.connect();

const CategoryRepository = require('./app/business/repositories/CategoryRepository');
const TitleRepository = require('./app/business/repositories/TitleRepository');

(async _ => {
  var title = await TitleRepository.getEpisodeById('5c908248046b41870cb74e91');

  console.log(title)
  /*var titles = await TitleRepository.getAll();
  for (var i = 0; i < titles.length; i++) {
    var title = titles[i];
    var category = await CategoryRepository.getByName(title.category);

    if (category != null) {
      await TitleRepository.setCategoryId(title._id, category._id);
      console.log("alterado");
    } else {
      console.log("Não encontrado: " + category);
    }

  }*/
})();
