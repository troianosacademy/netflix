const CategoryService = require('../../business/services/CategoryService');

module.exports = {
  index: async (req, res) => {
    res.render('admin/category/index.html', { categories: await CategoryService.getAll() });
  },

  record: async (req, res) => {
    res.render('admin/category/record.html', { category: await CategoryService.getById(req.params.id) });
  },

  save: async (req, res) => {
    res.render('admin/category/record.html', { category: await CategoryService.getById(req.params.id) });
  },

  remove: async (req, res) => {
    await CategoryService.remove(req.params.id);
    return res.redirect('/admin/categories');
  },

  save: async (req, res) => {
    let saveCategory = await CategoryService.save(req.body);

    if (saveCategory.errors) {
      res.render('admin/category/record.html', { category: req.body, errors: saveCategory.errors });
    } else {
      res.redirect('/admin/categories');
    }
  },
}
