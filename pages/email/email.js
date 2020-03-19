const api = require('../../utils/api.js');
Page({
	/**
   * 页面的初始数据
   */
	data: {
		hideModal: true,
		isAEmail: false,
		slideButtons: [
			{
				type: 'warn',
				text: '删除'
			}
		],
		mailList: []
	},

	// 滑动修改删除邮箱
	slideButtonTap: function(e) {
		console.log(e);
		this.deleteEmail(e.currentTarget.id);
	},

	// 删除邮箱
	deleteEmail: function(id) {
		var that = this;
		console.log(id);
		let list = this.data.mailList;
		let params = {
			function: '4',
			exc: 'delete',
			subscriptionID: list[id].SubscriptionID,
			email: [ list[id].email ]
		};

		console.log(params);
		api.post('/test?', params).then((res) => {
			console.log(res);
			list.splice(id, 1);
			that.setData({
				mailList: list
			});
		});
	},

	showModal: function() {
		var that = this;
		that.setData({
			hideModal: false
		});
		var animation = wx.createAnimation({
			duration: 600,
			timingFunction: 'ease'
		});
		this.animation = animation;
		setTimeout(function() {
			that.fadeIn();
		}, 200);
	},
	// 隐藏遮罩层
	hideModal: function() {
		var that = this;
		var animation = wx.createAnimation({
			duration: 1000, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
			timingFunction: 'ease' //动画的效果 默认值是linear
		});
		this.animation = animation;
		that.fadeDown(); //调用隐藏动画
		setTimeout(function() {
			that.setData({
				hideModal: true
			});
		}, 700); //先执行下滑动画，再隐藏模块
	},

	// 动画集
	fadeIn: function() {
		this.animation.translateY(0).step();
		this.setData({
			animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
		});
	},
	fadeDown: function() {
		this.animation.translateY(900).step();
		this.setData({
			animationData: this.animation.export()
		});
	},

	// 检测输入内容
	emailInput: function(e) {
		var email = e.detail.value;
		var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		var isAEmail = reg.test(email);
		this.setData({
			isAEmail,
			currentEmail: email
		});
	},
	// 检测结果
	subInput: function(e) {
		console.log(e);
	},

	// 确认邮箱是否有效
	confirmEmail: function() {
		var subId = this.data.subId;
		if (this.data.isAEmail) {
			var list = this.data.mailList;
			if (this.data.mailList.length == 0 || this.data.mailList.every((v) => v.email != this.data.currentEmail)) {
				var item = { email: this.data.currentEmail, SubscriptionID: subId };
				var name = item.email;
				list.push(item);
				this.hideModal();
				this.setData(
					{
						mailList: list
					},
					() => {
						var params = { function: '4', exc: 'add', subscriptionID: subId, email: [ name ] };
						console.log(params);
						api.post('/test?', params).then((res) => {
							console.log(res);
							wx.showToast({
								title: '成功',
								icon: 'success',
								duration: 1000
							});
						});
					}
				);
			} else {
				wx.showToast({
					title: '已存在的邮箱',
					icon: 'none',
					duration: 1500
				});
			}
		} else {
			wx.showToast({
				title: '请输入正确的邮箱',
				icon: 'none',
				duration: 1500
			});
		}
	},

	// 请求关联邮箱列表
	queryEmailList: function(id) {
		var params = { function: '4', exc: 'select', subscriptionID: id };
		var that = this;
		api
			.post('/test?', params)
			.then((res) => {
				console.log(res);
				if (res.select_email_status == 'success') {
					that.setData({
						mailList: res.result
					});
				}
			})
			.catch((reason) => {
				console.log(reason);
				wx.showToast({
					title: '网络超时',
					icon: 'none',
					duration: 2000
				});
			});
	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		console.log(options);
		if (options.subId) {
			this.queryEmailList(options.subId);
			this.setData({
				subId: options.subId
			});
		}
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
