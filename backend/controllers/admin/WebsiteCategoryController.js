const WebsiteCategoryService = require('../../services/admin/WebsiteCategoryService');
const { formatTime } = require('../../utils/index')

const WebsiteCategoryController = {
  // 创建网站分类
  create: async (req, res) => {
    const { username } = req.userInfo;
    const params = {
      ...req.body,
      creator: username,
      createTime: formatTime()
    }
    const { status, data} = await WebsiteCategoryService.create(params);
    console.log('创建网站分类',data);
    if (status) {
      req.formatData(true, '创建成功', data);
    } else {
      req.formatData(false, '创建失败', data);
    }
  },

  // 根据 id 删除分类
  delete: async (req, res) => {
    const { username } = req.userInfo;
    const { id } = req.params;
    const params = {
      id,
      modifier: username,
      modifyTime: formatTime()
    }

    const { status, data} = await WebsiteCategoryService.delete(params);
    if (status) {
      req.formatData(true, '删除成功', data);
    } else {
      req.formatData(false, '删除失败', data);
    }
  },

  // 根据 id 更新分类
  update: async (req, res) => {
    const { username } = req.userInfo;
    const { id } = req.params;

    const { title } = req.body;
    const body = {
      title,
      modifier: username,
      modifyTime: formatTime()
    }

    const { status, data} = await WebsiteCategoryService.update(id, body);
    if (status) {
      req.formatData(true, '更新成功', data);
    } else {
      req.formatData(false, '更新失败', data);
    }
  },

  // 获取当前用户创建的website
  getAll: async (req, res) => {
    const { username } = req.userInfo;
    const params = {
      username
    };
    const { status, data} = await WebsiteCategoryService.getAll(params);
    if (status) {
      req.formatData(true, '查询成功', data);
    } else {
      req.formatData(false, '查询失败', data);
    }
  },
};

module.exports = WebsiteCategoryController;