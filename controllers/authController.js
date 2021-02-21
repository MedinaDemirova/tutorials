const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');
const isGuest = require('../middlewares/isGuest');
const isAuthenticated = require('../middlewares/isAuthenticated');

//Register
router.get('/register',isGuest, (req, res) => {
    res.render('auth/register')
});

router.post('/register',isGuest, async (req, res) => {

    if (req.body.password !== req.body.rePassword) {
        res.status(404);
        res.render('auth/register', { error: { message: 'Passwords does not match!' } });
        return;
    }

    try {
        await authService.register(req.body);
        res.status(201);

        // login directly -->
        let token = await authService.login(req.body)
        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/')

        //  redirect to login --->  res.redirect('/auth/login')
    } catch (error) {
        res.status(404);
        res.render('auth/register', { error });
        return;
    }
});


//Log in
router.get('/login',isGuest, (req, res) => {
    res.render('auth/login')
});

router.post('/login',isGuest, async (req, res) => {
    try {
        let token = await authService.login(req.body)
        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/')
    } catch (error) {
        res.status(404);
        res.render('auth/login', { error })
    }
});


//Log Out
router.get('/logout', (req, res) => {
 console.log ( 'lo out')
    req.app.locals = {};
    console.log (req.app.locals)
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});



module.exports = router;