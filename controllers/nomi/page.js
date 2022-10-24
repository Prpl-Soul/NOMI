const Page = require('../../models/nomi/page');

exports.getPages = (req, res, next) => {
    Page.find()
      .select('id type img next -_id')
      .then(
        (pages) => {
          req.infos.pages=pages
          return next()
        }
      )
      .catch(error => res.status(400).json({ error }));
  }
