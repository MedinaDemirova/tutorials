const router = require('express').Router();
const dataService = require ('../services/dataService');

router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        let hasUser = Boolean (req.user);
      
        let courses = await dataService.getAll(hasUser);

        if (req.user) {
          
            res.render('home/userHome', { courses,  searchOptions: req.query, })
        } else {
          
            res.render('home/guestHome', { courses })
        }
    } catch (error) {
        res.render('/', { error: { message: error } })
    }
});

module.exports = router;