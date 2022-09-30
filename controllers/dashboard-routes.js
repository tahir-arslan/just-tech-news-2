const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// `.get( )` and `.post( )` can recieve a dynamic number of args/callback functions
// in this case, `withAuth` is middleware. it runs function, and if `session.user_id = true`, then
// execute anonymous function `next( )` which in this case will be the remainder of the `.get( )` 
// callback function. if `session.user_id = false`, then call `res.redirect( )` which is the response.
// this way, the callback function in `.get( )` will not occur since response has already been
// sent via `res.redirect( )` in the `withAuth` function
// with this authguard in other routes, non-authenticated users will not be able to send
// CRUD requests to server
router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});  

module.exports = router;