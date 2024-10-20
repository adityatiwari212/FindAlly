import {Project} from "../models/project"

// get project details and populate users
export const getProjectDetail = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId).populate('users');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// create a new project
export const createProject = async (req, res) => {
    try {
      const { title, description, gitUrl, techStack, users, chatUrl, category } = req.body;
  
    
      if (!title || !description || !gitUrl || !techStack || !users || !category) {
        return res.status(400).json({ message: 'All required fields must be provided' });
      }
  
      
      const newProject = new Project({
        title,
        description,
        gitUrl,
        techStack,
        users,
        chatUrl,
        category,
      });
  
      
      const savedProject = await newProject.save();
  
      return res.status(201).json(savedProject);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const closeApplication = async (req, res) => {
    try {
      const projectId = req.params.id;
  
      const project = await Project.findByIdAndUpdate(
        projectId,
        { isApplicationOpen: false },
        { new: true } 
      );
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      return res.status(200).json({ message: 'Application closed', project });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const getProjectsByTechStack = async (req, res) => {
    try {
      const techStacks = req.query.techStacks.split(','); // Assuming tech stacks are provided as a comma-separated string
  
      const projects = await Project.find({
        techStack: { $in: techStacks },
      });
  
      return res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


  export const getProjectsByCategory = async (req, res) => {
    try {
      const categories = req.query.categories.split(','); // Assuming categories are provided as a comma-separated string
  
      const projects = await Project.find({
        category: { $in: categories },
      });
  
      return res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };