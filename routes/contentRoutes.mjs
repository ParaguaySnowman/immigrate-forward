import express from 'express'; // Use 'import' for ES Modules
const router = express.Router();

import cmsController from '../controllers/cms.controller'; // Assuming correct path

router.get('/content/:category', cmsController.renderCategory); 

export default router; // Export using 'export default'
