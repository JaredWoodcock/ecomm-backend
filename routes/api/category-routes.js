const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  try {
    // Gets all categories and associated products
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one category by ID
router.get('/:id', async (req, res) => {
  try {
    // Gets a single category and all associated products
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a category by ID
router.put('/:id', async (req, res) => {
  try {
    // Update a category by it's id
    const updatedCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    // If no category found, return 404 response
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json({ message: `Successfully updated category with ID ${req.params.id}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by it's id
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });

    // If no category found, return 404 response
    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json({ message: `Successfully deleted category with ID ${req.params.id}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
