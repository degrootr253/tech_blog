const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const commentDB = await Comment.findAll({});
    res.status(200).json(commentDB);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const commentDB = await Comment.findAll({
      where: {
        id: req.body.id
      }
    });
    res.status(200).json(commentDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
      const commentData = await Comment.update({
          title: req.body.title,
          comment_text: req.body.comment_text
      },
          {
              where: {
                  id: req.params.id,
              },
          });

      if (!commentData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
      }

      res.status(200).json(commentData);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;