const Title = require('../models/Title');
const mongoose = require('mongoose');

module.exports = {
  getAll: async function() { return await this.getBy({}) },

  getRecents: async () => {
    return await Title.aggregate([
      { $sort: { date: -1 } },
      { $limit: 9 }
    ]);
  },

  getBy: async (field) => {
    return Title.aggregate([
      { $match: field },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        }
      },
      { $unwind: "$category" },
    ]);
  },

  getById: async function(id) { return await this.getBy({ _id: mongoose.Types.ObjectId(id) }).then(results => results[0]) },

  getByCategoryId: async function(categoryId) { return await this.getBy({ categoryId }).then(results => results[0]) },

  getByType: async function(type) { return await this.getBy({ type }) },

  getByTypeAndCategory: async function(type, categoryId) { return await this.getBy({ type, categoryId: mongoose.Types.ObjectId(categoryId) }) },

  insert: async (title) => await Title.create(title),

  update: async (title) => await Title.findByIdAndUpdate(title._id, { $set: title }),

  search: async (query) => await Title.find({ title: { '$regex': query, '$options': 'i' } }),

  getFixedOnHome: async function() { return await this.getBy({ isFixedOnHome: true }).then(results => results[0]) },

  setFixedOnHome: async function(id) {
    console.log("aquii")
    console.log(id)
    await Title.updateMany({}, { isFixedOnHome: false });
    console.log(id)
    return await Title.findByIdAndUpdate(id, { isFixedOnHome: true });
  },

  getEpisodeById: async function(episodeId) {

    return Title.aggregate([

      { "$unwind": "$seasons" },
      {
        "$replaceRoot": {
          "newRoot": { "$mergeObjects": ["$$ROOT", "$seasons"] }
        }
      },
      { "$unwind": "$episodes" },
      {
        "$replaceRoot": {
          "newRoot": { "$mergeObjects": ["$episodes", "$$ROOT"] }
        }
      },
      { $match: { 'episodes._id': mongoose.Types.ObjectId(episodeId) } },

      { "$project": { "episodes": 1 } },

    ]).then(x => x[0] ? x[0].episodes : null)
  },

  getAllGroupByCategory: async () => {
    return await Title.aggregate([
      { $match: { $or: [{ isFixedOnHome: null }, { isFixedOnHome: false }] } },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        }
      },
      {
        $group: {
          _id: '$category.name',
          entries: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          category: "$_id",
          titles: "$entries",
          _id: false
        }
      }
    ]);
  },

}
