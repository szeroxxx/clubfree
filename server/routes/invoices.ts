import express from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { getPrismaClient } from '../db';

const router = express.Router();
const prisma = getPrismaClient();

router.use(authenticate);

router.get('/', async (req: AuthRequest, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        project: {
          include: { client: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

router.post('/', async (req: AuthRequest, res) => {
  try {
    const { invoiceNumber, projectId, amount, status, issueDate, dueDate } = req.body;
    const invoice = await prisma.invoice.create({
      data: { invoiceNumber, projectId, amount, status, issueDate, dueDate }
    });
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { invoiceNumber, projectId, amount, status, issueDate, dueDate } = req.body;
    const invoice = await prisma.invoice.update({
      where: { id },
      data: { invoiceNumber, projectId, amount, status, issueDate, dueDate }
    });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update invoice' });
  }
});

router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    await prisma.invoice.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
});

export default router;
