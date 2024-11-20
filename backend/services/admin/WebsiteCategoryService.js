const WebsiteCategory = require('../../models/WebsiteCategory');

const WebsiteCategoryService = {
  // 添加一条数据
  create: async (params) => {
    try {
      const data = await WebsiteCategory.create({
        ...params
      })
      return {
        status: true,
        data
      }
    } catch (error) {
      return {
        status: false,
        data: error
      }
    }
  },
  // 删除一条数据
  delete: async (params) => {
    try {
      const { id, modifier, modifyTime } = params;
      const data = await WebsiteCategory.findOneAndUpdate(
        {
          _id: id
        },
        { 
          status: 0,
          modifier,
          modifyTime
        }
      )
      return {
        status: true,
        data
      }
    } catch (error) {
      return {
        status: false,
        data: error
      }
    }
  },

  // 更新数据
  update: async (id, body) => {
    try {
      const data = await WebsiteCategory.findOneAndUpdate(
        {
          _id: id,
          status: 1,
        },
        { 
          ...body
        }
      )
      if (data) {
        return {
          status: true,
          data
        }
      }
      return {
        status: false,
        data: '未查询到数据，更新失败' 
      }
    } catch (error) {
      return {
        status: false,
        data: error
      }
    }
  },

  // 获取所有网站分类
  getAll: async (params) => {
    try {
      const { username } = params;
      const data = await WebsiteCategory.find({ status: 1, creator: username });
      return {
        status: true,
        data: data || [] 
      }
    } catch (error) {
      return {
        status: false,
        data: error
      }
    }
  },
}

module.exports = WebsiteCategoryService;