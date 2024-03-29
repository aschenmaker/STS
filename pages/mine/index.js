// pages/about/index.js
var app = getApp();
Page({
	/**
   * 页面的初始数据
   */
	data: {
		avatarUrl: '../../asset/img/avatar.png',
		nickname: '未授权',
		subsciribedNumber: '0'
	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		// 设置用户头像，如果登录则取用户的用户头像
		this.readUserInfo();
	},

	// 读取本地存储的头像信息
	readUserInfo: function() {
		// var _this = this;
		wx.getStorage({
			key: 'userinfo',
			success: (res) => {
				var avatarUrl = res.data.avatarUrl || this.data.avatarUrl;
				var nickname = res.data.nickName || this.data.nickname;
				this.setData({
					avatarUrl,
					nickname
				});
			}
		});
	},
	//读取订阅信息
	readOptions: function() {
		wx.getStorage({
			key: 'options',
			success: (res) => {
				console.log(res.data);
				var subsciribedNumber = res.data.length ? `${res.data.length}` : '0';
				this.setData({
					subsciribedNumber
				});
			}
		});
	},
	naviToMail: function() {
		console.log('1');
		var url = '../email/email?' + 'UID=asd';
		wx.navigateTo({
			url
		});
	},
	naviToLog: function() {
		console.log('1');
		var url = '../logs/log';
		wx.navigateTo({
			url
		});
	},
	naviToAbout: function() {
		console.log('1');
		var url = '../about/about';
		wx.navigateTo({
			url
		});
	},
	/**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function() {},

	/**
   * 生命周期函数--监听页面显示
   */
	onShow: function() {
		this.readUserInfo();
		this.readOptions();
	},

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
