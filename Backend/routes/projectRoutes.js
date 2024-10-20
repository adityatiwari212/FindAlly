import express from 'express';
import {
  getProjectDetail,
  createProject,
  closeApplication,
  getProjectsByTechStack,
  getProjectsByCategory,
} from '../controllers/projectController.js'; 

const router = express.Router();


router.route('/projects/:id')
  .get(getProjectDetail)
  .patch('/close', closeApplication); // For closing the application

router.route('/projects')
  .post(createProject);

router.route('/projects/techstack')
  .get(getProjectsByTechStack);

router.route('/projects/category')
  .get(getProjectsByCategory);

export default router;
