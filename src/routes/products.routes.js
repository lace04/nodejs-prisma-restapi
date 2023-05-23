import { Router } from 'express';
import { prisma } from '../db.js';

const router = Router();

router.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.get('/products/:id', async (req, res) => {
  const product = await prisma.product.findFirst({
    where: { id: parseInt(req.params.id) },
    include: { Category: true },
  });

  if (!product) return res.status(404).json({ msg: 'Product not found' });

  res.json(product);
});

router.post('/products', async (req, res) => {
  const newProduct = await prisma.product.create({
    data: req.body,
  });
  res.json(newProduct);
});

router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.delete({
    where: { id: Number(id) },
  });

  if (!product) return res.status(404).json({ msg: 'Product not found' });

  res.json(product);
});

router.put('/products/:id', async (req, res) => {
  const productUpdated = await prisma.product.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  return res.json(productUpdated);
});

export default router;
