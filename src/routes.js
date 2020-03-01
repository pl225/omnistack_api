const express = require('express');
const devController = require('./controllers/DevController');
const likeController = require('./controllers/LikeController');
const dislikeController = require('./controllers/DislikeController');

const routes = express.Router();

routes.post('/devs', devController.store);
routes.get('/devs', devController.index);
routes.post('/devs/:devId/likes', likeController.store);
routes.post('/devs/:devId/dislikes', dislikeController.store);

module.exports = routes;