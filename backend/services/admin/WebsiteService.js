const WebsiteModel = require('../../models/WebsiteModel');

const WebsiteService = {
  // 添加一条数据
  createWebsite: async (params) => {
    try {
      const data = await WebsiteModel.create({
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
  deleteWebsiteById: async (params) => {
    try {
      const { id, modifier, modifyTime } = params;
      const data = await WebsiteModel.findOneAndUpdate(
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
  updateWebsiteById: async (id, body) => {
    try {
      const data = await WebsiteModel.findOneAndUpdate(
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

  // 获取所有网站列表
  getWebsites: async (params) => {
    try {
      const { username } = params;
      const data = await WebsiteModel.find({ status: 1, creator: username });
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

  // 根据id获取website信息
  getWebsiteById: async (id) => {
    try {
      const data = await WebsiteModel.findOne({ status: 1, _id: id });
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
  }
}

module.exports = WebsiteService;