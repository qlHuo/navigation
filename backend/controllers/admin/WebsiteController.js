const WebsiteService = require('../../services/admin/WebsiteService');
const { formatTime } = require('../../utils/index')

const WebsiteController = {
  // 创建网站
  createWebsite: async (req, res) => {
    console.log('createWebsite', req.userInfo)
    const { username } = req.userInfo;
    const params = {
      ...req.body,
      creator: username,
      createTime: formatTime()
    }
    const { status, data} = await WebsiteService.createWebsite(params);
    console.log('创建网站',data);
    if (status) {
      req.formatData(true, '创建成功', data);
    } else {
      req.formatData(false, '创建失败', data);
    }
  },

  // 根据 websiteId 删除网站
  deleteWebsiteById: async (req, res) => {
    const { username } = req.userInfo;
    const { id } = req.params;
    const params = {
      id,
      modifier: username,
      modifyTime: formatTime()
    }

    const { status, data} = await WebsiteService.deleteWebsiteById(params);
    if (status) {
      req.formatData(true, '删除成功', data);
    } else {
      req.formatData(false, '删除失败', data);
    }
  },

  // 根据 websiteId 更新网站
  updateWebsiteById: async (req, res) => {
    const { username } = req.userInfo;
    const { id } = req.params;

    const { title, url, logo, description } = req.body;
    const body = {
      title, 
      url, 
      logo, 
      description,
      modifier: username,
      modifyTime: formatTime()
    }

    const { status, data} = await WebsiteService.updateWebsiteById(id, body);
    if (status) {
      req.formatData(true, '更新成功', data);
    } else {
      req.formatData(false, '更新失败', data);
    }
  },

  // 获取当前用户创建的website
  getWebsites: async (req, res) => {
    const { username } = req.userInfo;
    const params = {
      username
    };
    const { status, data} = await WebsiteService.getWebsites(params);
    if (status) {
      req.formatData(true, '查询成功', data);
    } else {
      req.formatData(false, '查询失败', data);
    }
  },

  // 根据id获取website
  getWebsiteById: async (req, res) => {
    const { id } = req.params;
    const { status, data} = await WebsiteService.getWebsiteById(id);
    if (status) {
      req.formatData(true, '查询成功', data);
    } else {
      req.formatData(false, '查询失败', data);
    }
  },

};

module.exports = WebsiteController;