const api = require('../../utils/api.js');
// const loginapi = require('../../utils/loginapi.js');

Page({
	/**
   * 页面的初始数据
   */
	data: {
		isHiden: true,
		subscribeList: []
	},

	naviToSearch: function() {
		wx.navigateTo({
			url: '../search/search'
		});
	},

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

	// 请求服务器订阅数据，存储本地订阅数据
	readSubscribeInfo: function() {
		var _this = this;
		var infoList = [];
		wx.getStorage({
			key: 'options',
			success(res) {
				// console.log(res.data);
				res.data.map((value, index) => {
					var list = { title: '', keywords: {}, id: '' };
					list.id = index;
					list.title = value.searchkeyword;
					// console.log(value.keywords);
					if (value.keywords.length > 0) {
						value.keywords.map((value, i) => {
							list.keywords[`keyword${i}`] = value;
						});
					}
					infoList.push(list);
				});
				// console.log(infoList);
				_this.setData({
					subscribeList: infoList
				});
			}
		});
	},
	// 编辑订阅
	editSub: function(e) {
		console.log(e);
		var id = 'id=' + e.currentTarget.id;
		wx.navigateTo({
			url: '../../pages/search/search?' + id,
			events: {
				// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
				acceptDataFromOpenedPage: function(data) {
					console.log(data);
				},
				someEvent: function(data) {
					console.log(data);
				}
			},
			success: function(res) {
				// 通过eventChannel向被打开页面传送数据
				res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' });
			}
		});
	},
	// 删除订阅
	deleteSub: function(e) {
		var _this = this;
		wx.showModal({
			title: '提示',
			content: '这将删除您的订阅',
			cancelColor: '#67C141',
			confirmColor: '#AAAAAA',
			success(r) {
				if (r.confirm) {
					wx.getStorage({
						key: 'options',
						success(res) {
							res.data.splice(e.target.id, 1);
							wx.setStorage({
								key: 'options',
								data: res.data,
								success() {
									_this.readSubscribeInfo();
								}
							});
						}
					});
				} else if (r.cancel) {
				}
			}
		});
	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		// 登录
		var _this = this;
		var _code = '';
		// loginapi.login();
		wx.login({
			success: (res) => {
				_code = res.code;
			}
		});
		// 获取用户信息
		wx.getSetting({
			success: (res) => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: ({ rawData, signature, encryptedData, iv, userInfo }) => {
							// 可以将 res 发送给后台解码出 unionId
							let params = {
								function: '2',
								code: _code,
								rawData,
								signature,
								encryptedData,
								iv
							};
							api
								.post('/test?', params)
								.then((res) => {
									console.log(res);
									console.log('登录成功，获取到 openid');
									userInfo['openId'] = res.openId;
								})
								.then(() => {
									wx.setStorage({
										key: 'userinfo',
										data: userInfo
									});
								});
							// console.log(userInfo);

							this.setData({
								isHiden: false
							});

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
	onShow: function() {
		this.readSubscribeInfo();
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
