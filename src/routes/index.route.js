const router = require('express').Router()

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express Recipes' });
});

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    if (email === 'hoge@hoge.com' && password === 'hogehoge') {
        res.redirect('/recipes');
    } else {
        res.redirect('/');
    }
});

module.exports = router;