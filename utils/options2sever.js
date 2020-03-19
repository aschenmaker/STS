let frequencyArr = [ 'immediately', 'daily', 'weekly', 'monthly' ];
let resultTypeArr = [ 'PDF', 'Email', 'miniprogram' ];
var settimevalue = 0;
var thetime = [ '周一', '周二', '周三', '周四', '周五', '周六', '周日', '自动' ];

const optionsToSever = function(settings, exc, UID, emails) {
	if (settings.timeValue.length == 2) {
		settimevalue =
			thetime.findIndex((i) => {
				return i == settings.timeValue;
			}) + 1;
	}
	if (settings.timeValue.length == 5) {
		settimevalue = settings.timeValue.slice(0, 2) * 1 || settings.timeValue.slice(2, 4) * 1;
	}
	if (settings.timeValue.length == 4) {
		settimevalue = settings.timeValue.slice(2, 3) * 1;
	}

	var params = {
		function: '3',
		UID,
		exc,
		subject: settings.searchkeyword,
		keyword: settings.keywords,
		frequency: frequencyArr[settings.frequentIndex],
		settime: settimevalue,
		resultType: resultTypeArr[settings.subscribeModeIndex],
		email: emails
	};

	return params;
};

const severToOptions = function(sever) {
	var time = '';
	let keywordsArr = [];
	if (sever.keyword.length != 0) {
		keywordsArr = sever.keyword.split(',').filter((item) => item.length > 0);
	}
	let frequencyMode = frequencyArr.indexOf(sever.frequency);
	if (frequencyMode == 0) {
		time = '自动';
	}
	if (frequencyMode == 1) {
		time = sever.settime + ':00';
	}
	if (frequencyMode == 2) {
		time = thetime[sever.settime];
	}
	if (frequencyMode == 3) {
		time = '每月' + sever.settime + '号';
	}
	var whatineed = {
		searchkeyword: sever.subject,
		subscibeKeywords: sever.keyword,
		frequentIndex: frequencyArr.indexOf(sever.frequency),
		fromIndex: 0,
		amountIndex: 0,
		subscribeModeIndex: resultTypeArr.indexOf(sever.resulttype),
		timeValue: time,
		subId: sever.SubscriptionID,
		keywords: keywordsArr
	};
	return whatineed;
};

module.exports = {
	optionsToSever,
	severToOptions
};
