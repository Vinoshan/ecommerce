const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET All Products with associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET One Product by ID with associated Category and Tag data
router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a New Product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Update a Product by ID
router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    await Product.update(req.body, {
      where: { id: productId },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagsToRemove = await ProductTag.findAll({
        where: { product_id: productId },
      });

      const productTagIds = productTagsToRemove.map(({ tag_id }) => tag_id);

      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: productId,
            tag_id,
          };
        });

      await ProductTag.destroy({
        where: { id: productTagIds },
      });

      await ProductTag.bulkCreate(newProductTags);
    }

    res.json({ message: 'Product updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete a Product by ID
router.delete('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.destroy({
      where: { id: productId },
    });
    if (deletedProduct === 0) {
      res.status(404).json({ message: 'Product not found.' });
      return;
    }
    res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
