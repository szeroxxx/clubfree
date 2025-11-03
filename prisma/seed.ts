import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  console.log("Clearing existing data...");
  await prisma.document.deleteMany();
  await prisma.folder.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.task.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.client.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.user.deleteMany();
  console.log("Existing data cleared.");

  // Create Employees first
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        id: "emp-1",
        name: "Admin User",
        email: "admin@company.com",
        jobTitle: "System Administrator",
      },
    }),
    prisma.employee.create({
      data: {
        id: "emp-2",
        name: "HR Person",
        email: "hr@company.com",
        jobTitle: "Human Resources Manager",
      },
    }),
    prisma.employee.create({
      data: {
        id: "emp-3",
        name: "Sales Rep",
        email: "sales@company.com",
        jobTitle: "Sales Representative",
      },
    }),
    prisma.employee.create({
      data: {
        id: "emp-4",
        name: "Developer One",
        email: "dev1@company.com",
        jobTitle: "Software Engineer",
      },
    }),
    prisma.employee.create({
      data: {
        id: "emp-5",
        name: "Developer Two",
        email: "dev2@company.com",
        jobTitle: "Frontend Developer",
      },
    }),
  ]);

  // Create Clients
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        id: "cli-1",
        name: "John Doe",
        email: "john.doe@example.com",
        company: "Innovate Inc.",
      },
    }),
    prisma.client.create({
      data: {
        id: "cli-2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        company: "Solutions Co.",
      },
    }),
  ]);

  // Create Users with hashed passwords
  const hashedPassword = await bcrypt.hash("password", 10);
  await Promise.all([
    prisma.user.create({
      data: {
        id: "user-1",
        username: "admin",
        password: hashedPassword,
        name: "Admin User",
        role: "Admin",
        entityId: "emp-1",
      },
    }),
    prisma.user.create({
      data: {
        id: "user-2",
        username: "hr",
        password: hashedPassword,
        name: "HR Person",
        role: "HR",
        entityId: "emp-2",
      },
    }),
    prisma.user.create({
      data: {
        id: "user-3",
        username: "sales",
        password: hashedPassword,
        name: "Sales Rep",
        role: "Sales",
        entityId: "emp-3",
      },
    }),
    prisma.user.create({
      data: {
        id: "user-4",
        username: "dev",
        password: hashedPassword,
        name: "Developer One",
        role: "Employee",
        entityId: "emp-4",
      },
    }),
    prisma.user.create({
      data: {
        id: "user-5",
        username: "johndoe",
        password: hashedPassword,
        name: "John Doe",
        role: "Client",
        entityId: "cli-1",
      },
    }),
    prisma.user.create({
      data: {
        id: "user-6",
        username: "janesmith",
        password: hashedPassword,
        name: "Jane Smith",
        role: "Client",
        entityId: "cli-2",
      },
    }),
  ]);

  // Create Projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        id: "proj-1",
        name: "Website Redesign",
        clientId: "cli-1",
        status: "Active",
        deadline: "2024-08-30",
        members: {
          create: [{ employeeId: "emp-4" }, { employeeId: "emp-5" }],
        },
      },
    }),
    prisma.project.create({
      data: {
        id: "proj-2",
        name: "Mobile App Dev",
        clientId: "cli-2",
        status: "Active",
        deadline: "2024-09-15",
        members: {
          create: [{ employeeId: "emp-4" }],
        },
      },
    }),
    prisma.project.create({
      data: {
        id: "proj-3",
        name: "Marketing Campaign",
        clientId: "cli-1",
        status: "Completed",
        deadline: "2024-07-20",
        members: {
          create: [{ employeeId: "emp-3" }],
        },
      },
    }),
  ]);

  // Create Tasks
  await Promise.all([
    prisma.task.create({
      data: {
        id: "task-1",
        title: "Design Homepage Mockup",
        projectId: "proj-1",
        priority: "High",
        status: "In Progress",
        dueDate: "2024-07-30",
        assigneeId: "emp-5",
      },
    }),
    prisma.task.create({
      data: {
        id: "task-2",
        title: "Develop Login API",
        projectId: "proj-2",
        priority: "High",
        status: "To Do",
        dueDate: "2024-08-05",
        assigneeId: "emp-4",
      },
    }),
    prisma.task.create({
      data: {
        id: "task-3",
        title: "Setup User Authentication",
        projectId: "proj-2",
        priority: "Medium",
        status: "To Do",
        dueDate: "2024-08-10",
        assigneeId: "emp-4",
      },
    }),
    prisma.task.create({
      data: {
        id: "task-4",
        title: "Finalize Ad Copy",
        projectId: "proj-3",
        priority: "Low",
        status: "Done",
        dueDate: "2024-07-15",
        assigneeId: "emp-3",
      },
    }),
    prisma.task.create({
      data: {
        id: "task-5",
        title: "Create Style Guide",
        projectId: "proj-1",
        priority: "Medium",
        status: "To Do",
        dueDate: "2024-08-02",
        assigneeId: "emp-5",
      },
    }),
  ]);

  // Create Invoices
  await Promise.all([
    prisma.invoice.create({
      data: {
        id: "inv-1",
        invoiceNumber: "INV-001",
        projectId: "proj-3",
        amount: 5000,
        status: "Paid",
        issueDate: "2024-07-21",
        dueDate: "2024-08-05",
      },
    }),
    prisma.invoice.create({
      data: {
        id: "inv-2",
        invoiceNumber: "INV-002",
        projectId: "proj-1",
        amount: 2500,
        status: "Sent",
        issueDate: "2024-07-25",
        dueDate: "2024-08-10",
      },
    }),
  ]);

  // Create Folders and Documents
  const folders = await Promise.all([
    prisma.folder.create({ data: { id: "folder-1", name: "Passwords" } }),
    prisma.folder.create({ data: { id: "folder-2", name: "API Keys" } }),
    prisma.folder.create({ data: { id: "folder-3", name: "Meeting Notes" } }),
  ]);

  await Promise.all([
    prisma.document.create({
      data: {
        id: "doc-1",
        name: "Social Media Logins",
        folderId: "folder-1",
        content: "Facebook: user / pass\nTwitter: user / pass",
      },
    }),
    prisma.document.create({
      data: {
        id: "doc-2",
        name: "Project A - Notes",
        folderId: "folder-3",
        content: "Initial meeting takeaways...",
      },
    }),
  ]);

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
