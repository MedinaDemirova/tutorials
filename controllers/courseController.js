const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const dataService = require('../services/dataService');

//Create 
router.get('/create', isAuthenticated, (req, res) => {
    res.render('courses/create');
});

router.post('/create', isAuthenticated, async (req, res) => {
    try {
        await dataService.create(req.body, req.user._id);
        res.status(201);
        res.redirect('/');
    } catch (error) {
        res.render('courses/create', { error: { message: 'Something went wrong!' } });
    }
});

//Edit 
router.get('/:id/edit', isAuthenticated, async (req, res) => {
    let course = await dataService.getOne(req.params.id);
    res.render('courses/edit', { course });
});

router.post('/:id/edit', isAuthenticated, async (req, res) => {
 try {
     await dataService.updateOne (req.params.id, req.body);
     console.log ('done')
     res.status (201);
     res.redirect(`/courses/${req.params.id}/details`);
 }catch(error){
    res.redirect(`/courses/${req.params.id}/details`);;
 }
})


//Details 
router.get('/:id/details', isAuthenticated, async (req, res) => {
    try {
        let course = await dataService.getOne(req.params.id);
        // Does not work! 
        course.isEnrolled = course.usersEnrolled.includes(req.user._id);
        course.isOwn = course.creator == req.user._id;
        res.render('courses/details', { course: course });
    } catch (error) {
        res.render('/', { error: { message: 'Something went wrong!' } })
    }
});


//Enroll
router.get('/:id/enroll', isAuthenticated, async (req, res) => {
    try {
        await dataService.enroll(req.params.id, req.user._id);
        res.redirect(`/courses/${req.params.id}/details`);

    } catch (error) {
        res.render('/', { error: { message: 'Something went wrong!' } })
    }
});


//Delete
router.get('/:id/delete', isAuthenticated, async (req, res) => {
    try {
        await dataService.deleteData(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.render('/', { error: { message: 'Something went wrong!' } })
    }
});

module.exports = router;