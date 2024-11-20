const express = require('express');
const WebsiteRouter = express.Router();
const WebsiteController = require('../../controllers/admin/WebsiteController');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')
WebsiteRouter.post('/admin/website', checkTokenMiddleware, WebsiteController.createWebsite);
WebsiteRouter.delete('/admin/website/:id', checkTokenMiddleware, WebsiteController.deleteWebsiteById);
WebsiteRouter.put('/admin/website/:id', checkTokenMiddleware, WebsiteController.updateWebsiteById);
WebsiteRouter.get('/admin/websites', checkTokenMiddleware, WebsiteController.getWebsites);
WebsiteRouter.get('/admin/website/:id', checkTokenMiddleware, WebsiteController.getWebsiteById);


module.exports = WebsiteRouter;
