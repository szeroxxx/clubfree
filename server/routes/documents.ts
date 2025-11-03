import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.use(authenticate);

router.get('/folders', async (req: AuthRequest, res) => {
  try {
    const folders = await prisma.folder.findMany({
      include: { documents: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch folders' });
  }
});

router.post('/folders', async (req: AuthRequest, res) => {
  try {
    const { name } = req.body;
    const folder = await prisma.folder.create({
      data: { name }
    });
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create folder' });
  }
});

router.delete('/folders/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    await prisma.folder.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete folder' });
  }
});

router.get('/docs', async (req: AuthRequest, res) => {
  try {
    const docs = await prisma.document.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

router.post('/docs', async (req: AuthRequest, res) => {
  try {
    const { name, content, folderId } = req.body;
    const doc = await prisma.document.create({
      data: { name, content, folderId }
    });
    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create document' });
  }
});

router.put('/docs/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { name, content } = req.body;
    const doc = await prisma.document.update({
      where: { id },
      data: { name, content }
    });
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update document' });
  }
});

router.delete('/docs/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    await prisma.document.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;
