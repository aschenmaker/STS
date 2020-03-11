const api = require('../../utils/api.js');

Page({
	/**
   * 页面的初始数据
   */
	data: {
		// 检查是否为修改订阅
		toEdited: false,
		optionsIsShow: false,
		searchbarstyle: 'searchbarstyle',
		// 本地搜索结果内容
		contentlist: [],
		// 搜索频率
		frequent: [ '有新内容时', '每天一次', '每周一次', '每月一次' ],
		// 来源
		from: [ '自动', '新闻', '在线文章' ],
		// 数量
		amount: [ '仅最佳结果', '所有结果' ],
		// 搜索时间
		searchTime: [ '自动' ],
		searchTimeMode: 'selector',
		// 订阅结果的模式
		subscribeMode: [ '发送全部内容PDF', '发送到您的邮箱', '微信小程序提醒' ],
		// 修改的数据集
		options: {
			searchkeyword: '',
			subscibeKeywords: '',
			frequentIndex: 0,
			fromIndex: 0,
			amountIndex: 0,

			subscribeModeIndex: 1,
			timeValue: '自动'
		}
	},
	// setoptionsfunction
	setOptions: function(json, callback) {
		var defaultSettings = this.data.options;
		defaultSettings = Object.assign(defaultSettings, json);
		this.setData(
			{
				options: defaultSettings
			},
			() => {
				callback && callback();
			}
		);
	},
	// 列表隐藏函数
	showOptions: function() {
		var IsShow = !this.data.optionsIsShow;
		this.setData({
			optionsIsShow: IsShow
		});
	},
	// 启动搜索
	toUseSearch: function() {
		let params = {
			function: '1',
			keyword: this.data.options.searchkeyword
		};
		console.log(params);
		api
			.post('/test?', params)
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

	comfirmSearch: function(e) {
		console.log(e.detail.value);
		var _this = this;

		this.setOptions(
			{
				searchkeyword: e.detail.value
			},
			() => {
				_this.toUseSearch();
			}
		);
	},
	// 关键词
	bindinputKeywords: function(e) {
		// console.log(e.detail.value);
		this.setOptions({
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

		this.setOptions({ timeValue: value, frequentIndex: e.detail.value });

		this.setData({
			searchTime: thetime,
			searchTimeMode: searchMode
		});
	},
	bindPickerChangeC: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		this.setOptions({ fromIndex: e.detail.value });
	},
	bindPickerChangeA: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		this.setOptions({
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
		this.setOptions({
			timeValue: value
		});
	},
	bindPickerChangeS: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value);
		this.setOptions({
			subscribeModeIndex: e.detail.value
		});
	},
	// 创建订阅按钮
	createSubscibe: function(e) {
		console.log(e);
		var settings = this.data.options;
		settings.keywords = [];
		if (settings.subscibeKeywords.length != 0) {
			settings.keywords = settings.subscibeKeywords.split(' ').filter((item) => item.length > 0);
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
						var sameIndex = 0;
						var isE = res.data.some((value, index) => {
							sameIndex = index;
							return value.searchkeyword == settings.searchkeyword;
						});
						console.log(isE, sameIndex);
						if (isE) {
							// 搜索了同一类容 直接覆盖
							res.data[sameIndex] = settings;
							wx.setStorage({
								key: 'options',
								data: res.data
							});
						} else {
							res.data.push(settings);
							wx.setStorage({
								key: 'options',
								data: res.data
							});
						}
						wx.switchTab({
							url: '../../pages/index/index'
						});
					},
					fail() {
						console.log('本地无存储，进行写入');
						wx.setStorage({
							key: 'options',
							data: arr
						});
						wx.switchTab({
							url: '../../pages/index/index'
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
	onLoad: function(options) {
		console.log(options);
		var _this = this;
		var id = options.id;
		if (id.length > 0) {
			wx.getStorage({
				key: 'options',
				success(res) {
					var settings = res.data[id];
					console.log(settings);
					_this.setOptions(settings, () => {
						_this.toUseSearch();
					});
				}
			});
			this.setData({
				optionsIsShow: true,
				toEdited: true
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
