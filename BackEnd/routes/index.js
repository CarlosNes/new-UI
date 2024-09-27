const { Router } = require('express');
const sneakerController = require('../controllers/sneakerController'); 

const router = Router();


router.get('/sneakers', sneakerController.getAllSneakers);
router.post('/sneakers', sneakerController.createSneaker);
router.get('/sneakers/:id', sneakerController.getSneakerById);
router.put('/sneakers/:id', sneakerController.updateSneaker);
router.delete('/sneakers/:id', sneakerController.deleteSneaker);

module.exports = (app) => {
  app.use('/api', router); 
};
