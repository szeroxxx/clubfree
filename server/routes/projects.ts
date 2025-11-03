import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.use(authenticate);

router.get('/', async (req: AuthRequest, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        client: true,
        members: {
          include: { employee: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    const formatted = projects.map(p => ({
      ...p,
      memberIds: p.members.map(m => m.employeeId)
    }));
    
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

router.post('/', async (req: AuthRequest, res) => {
  try {
    const { name, clientId, status, deadline, memberIds } = req.body;
    
    const project = await prisma.project.create({
      data: {
        name,
        clientId,
        status,
        deadline,
        members: {
          create: memberIds.map((empId: string) => ({
            employeeId: empId
          }))
        }
      },
      include: {
        members: true
      }
    });
    
    res.status(201).json({ ...project, memberIds });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { name, clientId, status, deadline, memberIds } = req.body;
    
    await prisma.projectMember.deleteMany({ where: { projectId: id } });
    
    const project = await prisma.project.update({
      where: { id },
      data: {
        name,
        clientId,
        status,
        deadline,
        members: {
          create: memberIds.map((empId: string) => ({
            employeeId: empId
          }))
        }
      },
      include: {
        members: true
      }
    });
    
    res.json({ ...project, memberIds });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
