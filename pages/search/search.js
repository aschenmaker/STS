const api = require('../../utils/api.js');

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
		// 订阅关键词
		subscibeKeywords: [],
		// 本地搜索结果内容
		contentlist: [],
		// 搜索频率
		frequent: [ '有新内容时', '每天一次', '每周一次', '每月一次' ],
		frequentIndex: 0,
		// 来源
		from: [ '自动', '新闻', '在线文章' ],
		fromIndex: 0,
		// 数量
		amount: [ '仅最佳结果', '所有结果' ],
		amountIndex: 0,
		// 搜索时间
		timeValue: '自动',
		searchTime: [ '自动' ],
		searchTimeIndex: 0,
		searchTimeMode: 'selector',
		// 订阅结果的模式
		subscribeMode: [ '发送全部内容PDF', '发送到您的邮箱', '微信小程序提醒' ],
		subscribeModeIndex: 1,

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
	// 启动搜索
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
	// 关键词
	bindinputKeywords: function(e) {
		// console.log(e.detail.value);
		this.setData({
			subscibeKeywords: e.detail.value
		});
	},
	// picker的设置
	// 搜索的频率的 picker 用于关联 搜索时间的 picker
	bindPickerChangeF: function(e) {
		console.log('频率选择为发送选择改变，携带值为', this.data.frequent[e.detail.value]);
		if (e.detail.value == 0) {
			var searchMode = 'selector';
			var thetime = [ '自动' ];
			var value = '自动';
		}
		if (e.detail.value == 1) {
			var searchMode = 'time';
			var thetime = null;
			var value = '12:00';
		}
		if (e.detail.value == 2) {
			var searchMode = 'selector';
			var thetime = [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ];
			var value = '周一';
		}
		if (e.detail.value == 3) {
			var searchMode = 'selector';
			var thetime = [];
			for (let index = 0; index <= 30; index++) {
				thetime.push(`每月${index + 1}号`);
			}
			var value = '每月1号';
		}

		this.setData({
			timeValue: value,
			searchTime: thetime,
			searchTimeMode: searchMode,
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
	// bindtime picker此piker绑定了time
	bindPickerChangeL: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		if (e.detail.value.length <= 2) {
			var value = this.data.searchTime[e.detail.value];
		} else {
			var value = e.detail.value;
		}
		this.setData({
			timeValue: value
		});
	},
	bindPickerChangeS: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		this.setData({
			subscribeModeIndex: e.detail.value
		});
	},
	// 创建订阅按钮
	createSubscibe: function() {
		var settings = this.data.options;
		settings.searchkeyword = this.data.searchkeyword;
		settings.subscibeKeywords = this.data.subscibeKeywords;
		settings.frequentIndex = this.data.frequentIndex;
		settings.amountIndex = this.data.amountIndex;
		settings.fromIndex = this.data.fromIndex;
		settings.timeValue = this.data.timeValue;
		settings.subscribeModeIndex = this.data.subscribeModeIndex;
		if (this.data.subscibeKeywords.length != 0) {
			settings.keywords = this.data.subscibeKeywords.split(' ').filter((item) => item.length > 0);
		}
		var arr = [];
		arr.push(settings);
		this.setData(
			{
				options: settings
			},
			() => {
				wx.getStorage({
					key: 'options',
					success(res) {
						console.log('本地存储存在，进行读取');
						if (res.data[0].searchkeyword == settings.searchkeyword) {
							// 搜索了同一类容 直接覆盖
							wx.setStorage({
								key: 'options',
								data: arr
							});
						} else {
							res.data.push(settings);
							wx.setStorage({
								key: 'options',
								data: res.data
							});
						}
					},
					fail() {
						console.log('本地无存储，进行写入');
						wx.setStorage({
							key: 'options',
							data: arr
						});
					}
				});
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
