const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET All Tags with associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET One Tag by ID with associated Product data
router.get('/:id', async (req, res) => {
  const tagId = req.params.id;
  try {
    const tag = await Tag.findByPk(tagId, {
      include: [{ model: Product }],
    });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found.' });
      return;
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a New Tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Update a Tag by ID
router.put('/:id', async (req, res) => {
  const tagId = req.params.id;
  try {
    await Tag.update(req.body, {
      where: { id: tagId },
    });
    res.json({ message: 'Tag updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete a Tag by ID
router.delete('/:id', async (req, res) => {
  const tagId = req.params.id;
  try {
    const deletedTag = await Tag.destroy({
      where: { id: tagId },
    });
    if (deletedTag === 0) {
      res.status(404).json({ message: 'Tag not found.' });
      return;
    }
    res.json({ message: 'Tag deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
