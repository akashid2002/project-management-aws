import prisma from "../lib/prisma.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch projects ${error}` });
  }
};

export const createProject = async (req, res) => {
  const { name, description, startDate, endDate } = req.body;

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to create project ${error.message}` });
  }
};
