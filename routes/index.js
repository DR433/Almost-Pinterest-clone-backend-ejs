const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local');
const credentials = require('../schemas/credentials');
const isLoggedIn = require('../middlewares/isLoggedIn');
const upload = require('../middlewares/uploadImg');
const posts = require('../schemas/posts');
const router = express.Router();

passport.use(new localStrategy(credentials.authenticate()));

/* GET home page. */
// ************************************************************
router.get('/', function (req, res, next) {
  res.render('index', { error: req.flash('error') });
});

// backend for profile page
// ************************************************************
router.get('/profile', isLoggedIn, async (req, res, next) => {
  const user = await credentials.findOne({ username: req.session.passport.user }).populate('postids');
  res.render('profile', { user: user, posts: user.postids });
})

// backend for edit profile image
// ************************************************************
router.get('/editprofile', isLoggedIn, async (req, res, next) => {
  const user = await credentials.findOne({ username: req.session.passport.user });
  res.render('editProfile', { user: user });
})

//backend for a feed page
// ************************************************************
router.get('/feed', isLoggedIn, async (req, res, next) => {
  const allPosts = await posts.find({}).populate('userid');
  res.render('feed', { allPosts: allPosts });
});

// backend for creating posts
// ************************************************************
router.get('/createpost', isLoggedIn, async (req, res, next) => {
  res.render('createpost');
})


// uploading Routes
// ************************************************************
router.post('/uploadprofileimage', isLoggedIn, upload.single('uploadprofileimage'), async (req, res, next) => {
  if (!req.file) {
    return res.status(404).send('Something Went wrong.');
  }
  const user = await credentials.findOne({ username: req.session.passport.user });
  user.profileimg = req.file.filename;
  await user.save();
  res.redirect('/profile');
})

router.post('/uploadpostimage', isLoggedIn, upload.single('postimg'), async (req, res, next) => {
  if (!req.file) {
    return res.status(404).send('something went wrong');
  }
  const { postcaption, postdescription, tags } = req.body;
  const user = await credentials.findOne({ username: req.session.passport.user });
  const post = await posts.create({
    postcaption: postcaption,
    postdescription: postdescription,
    tags: tags.includes(',') === true ? tags.split(',').map(val => val.trim()) : [].concat(tags),
    postimg: req.file.filename,
    userid: user._id,
  });
  user.postids.push(post._id);
  await user.save();
  res.redirect('/profile');
})




// credentials Routes
// ************************************************************
router.get('/register', (req, res, next) => {
  res.render('register');
})

router.post('/register', async (req, res, next) => {
  const { fullname, username, password, email } = req.body;
  const user = await new credentials({
    fullname: fullname,
    username: username,
    email: email,
  });
  credentials.register(user, password)
    .then(() => {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/profile');
      })
    })
})

router.post('/', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/',
  failureFlash: true,
}), (req, res, next) => { });

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  })
})


module.exports = router;
