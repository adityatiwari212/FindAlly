import express from 'express';
import {
  getProjectDetail,
  createProject,
  closeApplication,
  getProjectsByTechStack,
  getProjectsByCategory,
  getOpenProjects
} from '../controllers/projectController.js'; 

const router = express.Router();



router.route('/create')
.post(createProject);

router.route('/techstack')
.get(getProjectsByTechStack);

router.route('/category')
.get(getProjectsByCategory);

router.route('/getOpenProjects').get(getOpenProjects);

router.route('/:id')
  .get(getProjectDetail)
  .patch(closeApplication); // For closing the application **PS : Always keep this route at the end**

export default router;
