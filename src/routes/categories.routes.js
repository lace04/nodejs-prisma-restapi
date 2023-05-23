import { Router } from 'express';
import { prisma } from '../db.js';

const router = Router();

router.get('/categories', async (req, res) => {
  const categories = await prisma.category.findMany({
    include: { products: true },
  });
  res.json(categories);
});

router.get('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.findFirst({
    where: { id: Number(id) },
  });

  if (!category) return res.status(404).json({ msg: 'Category not found' });

  res.json(category);
});

router.post('/categories', async (req, res) => {
  const newCategory = await prisma.category.create({
    data: req.body,
  });
  res.json(newCategory);
});

router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.delete({
    where: { id: Number(id) },
  });

  if (!category) return res.status(404).json({ msg: 'Category not found' });

  res.json(category);
});

router.put('/categories/:id', async (req, res) => {
  const categoryUpdated = await prisma.category.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  return res.json(categoryUpdated);
});

export default router;
