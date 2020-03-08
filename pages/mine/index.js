// pages/about/index.js
var app = getApp();
Page({
	/**
   * 页面的初始数据
   */
	data: {
		avatarUrl: '../../asset/img/avatar.png',
		nickname: '未授权'
	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		// 设置用户头像，如果登录则取用户的用户头像
		this.setUserPage();
	},

	setUserPage: function() {
		var avatarUrl = app.globalData.userInfo.avatarUrl || avatarUrl;
		var nickname = app.globalData.userInfo.nickName || nickname;
		this.setData({
			avatarUrl: avatarUrl,
			nickname: nickname
		});
	},

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
