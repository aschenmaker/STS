// const api = require('../../../utils/searchapi.js');

Page({
	/**
   * 页面的初始数据
   */
	data: {
		isHiden: true,
		subscribeList: [
			{
				title: '中国地质大学',
				keywords: {
					keyword1: '中国',
					keyword2: '地质大学'
				},
				id: '1'
			},
			{
				title: '新冠肺炎',
				keywords: {
					keyword1: '新冠',
					keyword2: 'conv'
				},
				id: '2'
			},
			{
				title: 'node.js',
				keywords: {
					keyword1: 'node',
					keyword2: 'javascript'
				},
				id: '3'
			},
			{
				title: 'smart',
				keywords: {
					keyword1: 'benz',
					keyword2: 'car'
				},
				id: '4'
			},
			{
				title: '湖北省武汉市鲁磨路',
				keywords: {
					keyword1: 'benz',
					keyword2: 'car'
				},
				id: '4'
			},
			{
				title: 'smart',
				keywords: {
					keyword1: 'benz',
					keyword2: 'car'
				},
				id: '4'
			}
		]
	},

	naviToSearch: function() {
		wx.navigateTo({
			url: './search/search'
		});
	},

	//用于设置用户信息本地存储.
	// setUserInfo:function(info){
	// 	wx.setStorage({
	// 			key: 'userinfo',
	// 			data: info
	// 	});
	// },

	// 授权页面授权按钮绑定事件
	bindGetUserInfo: function(e) {
		console.log(e);
		if (e.detail.userInfo) {
			//用户按了允许授权按钮
			var that = this;
			// 获取到用户的信息了，打印到控制台上看下
			console.log('用户的信息如下：');
			console.log(e.detail.userInfo);
			wx.setStorage({
				key: 'userinfo',
				data: e.detail.userInfo
			});
			// 隐藏授权页
			that.setData({
				isHiden: false
			});
		} else {
			//用户按了拒绝按钮
			wx.showModal({
				title: '提醒',
				content: '我们仅获取您的昵称、头像等信息，授权使我们能够提供服务',
				showCancel: false,
				confirmText: '返回授权',
				success: function(res) {
					// 用户没有授权成功，不需要改变 isHide 的值
					if (res.confirm) {
						console.log('用户点击了“返回授权”');
					}
				}
			});
		}
	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		// 登录
		var _this = this;
		wx.login({
			success: (res) => {
				console.log(res.code);
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			}
		});
		// 获取用户信息
		wx.getSetting({
			success: (res) => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: (res) => {
							// 可以将 res 发送给后台解码出 unionId
							console.log(res);
							wx.setStorage({
								key: 'userinfo',
								data: res.userInfo
							});
							this.setData({
								isHiden: false
							});
							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res);
							}
						},
						fail: () => {
							_this.setData({
								isHiden: true
							});
						}
					});
				}
			}
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
