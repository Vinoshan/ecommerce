const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET All Categories with associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Product });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET One Category by ID with associated Products
router.get('/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findByPk(categoryId, { include: Product });
    if (!category) {
      res.status(404).json({ message: 'Category not found.' });
      return;
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a New Category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a Category by ID
router.put('/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const updatedCategory = await Category.update(req.body, {
      where: { id: categoryId },
    });
    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'Category not found.' });
      return;
    }
    res.json({ message: 'Category updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a Category by ID
router.delete('/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    const deletedCategory = await Category.destroy({ where: { id: categoryId } });
    if (deletedCategory === 0) {
      res.status(404).json({ message: 'Category not found.' });
      return;
    }
    res.json({ message: 'Category deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
