const api = require('../../../utils/api.js');

Page({
	/**
   * 页面的初始数据
   */
	data: {
		// 检查是否为修改订阅
		toEdited: false,
		searchkeyword: '',
		optionsIsShow: false,
		searchbarstyle: 'searchbarstyle',
		contentlist: [],
		frequent: [ '有内容更新时', '每天最多一次', '每周最多一次' ],
		frequentIndex: 0,
		from: [ '自动', '博客', '新闻', '在线文章', '视频', '读书' ],
		fromIndex: 0,
		amount: [ '仅最佳结果', '所有结果' ],
		amountIndex: 0,
		language: [ '任何语言', '中文', '英语' ],
		languageIndex: 1,
		subscribeMode: [ '仅在应用内使用', '发送到您的邮箱', '微信小程序提醒' ],
		subscribeModeIndex: 0,

		options: {
			frequentIndex: 0,
			fromIndex: 0,
			amountIndex: 0,
			languageIndex: 1,
			subscribeModeIndex: 0
		}
	},
	// 列表隐藏函数
	showOptions: function() {
		var IsShow = !this.data.optionsIsShow;
		this.setData({
			optionsIsShow: IsShow
		});
	},
	comfirmSearch: function(e) {
		console.log(e.detail.value);
		let keyword = e.detail.value;
		this.setData({
			searchkeyword: e.detail.value
		});
		var _this = this;
		api
			.get('/test', {
				function: 1,
				keyword: keyword
			})
			.then((res) => {
				console.log(res);
				this.setData({
					contentlist: res
				});
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
	// picker的设置
	bindPickerChangeF: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		this.setData({
			frequentIndex: e.detail.value
		});
	},
	bindPickerChangeC: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		this.setData({
			fromIndex: e.detail.value
		});
	},
	bindPickerChangeA: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		this.setData({
			amountIndex: e.detail.value
		});
	},
	bindPickerChangeL: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		this.setData({
			languageIndex: e.detail.value
		});
	},
	bindPickerChangeS: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		this.setData({
			subscribeModeIndex: e.detail.value
		});
	},
	createSubscibe: function() {
		var settings = this.data.options;
		console.log(this.data.options);
		settings.frequentIndex = this.data.frequentIndex;
		settings.amountIndex = this.data.amountIndex;
		settings.fromIndex = this.data.fromIndex;
		settings.languageIndex = this.data.languageIndex;
		settings.subscribeModeIndex = this.data.subscribeModeIndex;
		this.setData(
			{
				options: settings
			},
			() => {
				console.log(this.data.options);
			}
		);
		// fromIndex: 0,
		// 	amountIndex: 0,
		// 	languageIndex: 1,
		// 	subscribeModeIndex: 0
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
