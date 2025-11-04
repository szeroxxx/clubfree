import express from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { getPrismaClient } from '../db';

const router = express.Router();
const prisma = getPrismaClient();

router.use(authenticate);

router.get('/', async (req: AuthRequest, res) => {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

router.post('/', async (req: AuthRequest, res) => {
  try {
    const { name, email, jobTitle } = req.body;
    const employee = await prisma.employee.create({
      data: { name, email, jobTitle }
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { name, email, jobTitle } = req.body;
    const employee = await prisma.employee.update({
      where: { id },
      data: { name, email, jobTitle }
    });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

export default router;
