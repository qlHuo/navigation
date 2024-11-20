const express = require('express');
const WebsiteCategoryRouter = express.Router();
const WebsiteCategoryController = require('../../controllers/admin/WebsiteCategoryController');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')
WebsiteCategoryRouter.post('/admin/website/category', checkTokenMiddleware, WebsiteCategoryController.create);
WebsiteCategoryRouter.delete('/admin/website/category/:id', checkTokenMiddleware, WebsiteCategoryController.delete);
WebsiteCategoryRouter.put('/admin/website/category/:id', checkTokenMiddleware, WebsiteCategoryController.update);
WebsiteCategoryRouter.get('/admin/website/category/list', checkTokenMiddleware, WebsiteCategoryController.getAll);


module.exports = WebsiteCategoryRouter;
