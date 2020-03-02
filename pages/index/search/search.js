// pages/index/search/search.js
Page({
	/**
   * 页面的初始数据
   */
	data: {
		optionsIsShow: false,
		searchbarstyle: 'searchbarstyle',
		contentlist: [
			{ id: 1, name: '搜索结果' },
			{ id: 2, name: '搜索结果' },
			{ id: 3, name: '搜索结果' },
			{ id: 4, name: '搜索结果' }
		],
		frequent: [ '有内容更新时', '每天最多一次', '每周最多一次' ],
		index: 0,
		from: [ '自动', '博客', '新闻', '在线文章', '视频', '读书' ],
		amount: [ '仅最佳结果', '所有结果' ],
		language: [ '任何语言', '中文', '英语' ],
		languageIndex: 1,
		subscribeMode: [ '仅在应用内使用', '发送到个人邮件{user.mail}', '微信小程序提醒' ]
	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {},

	/**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function() {},

	/**
   * 生命周期函数--监听页面显示
   */
	onShow: function() {},

	/**
   * 生命周期函数--监听页面隐藏
   */
	onHide: function() {},

	/**
   * 生命周期函数--监听页面卸载
   */
	onUnload: function() {},

	/**
   * 页面相关事件处理函数--监听用户下拉动作
   */
	onPullDownRefresh: function() {},

	/**
   * 页面上拉触底事件的处理函数
   */
	onReachBottom: function() {},

	/**
   * 用户点击右上角分享
   */
	onShareAppMessage: function() {}
});
