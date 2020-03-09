const api = require('../../../utils/api.js');

function login() {
	return new Promise((rej, res) => {
		//先调用 wx.login 获取code
		wx.login({
			success: (res) => {
				//调用 getUserInfo 获取用户信息 用于生成 UnionID
				wx.getUserInfo({
					// 返回res 含有 rawData, userinfo,signature, encryptedData, i
					success: ({ rawData, signature, encryptedData, iv }) => {
						let params = {
							code: res.code,
							rawData,
							signature,
							encryptedData,
							iv
						};
						// 请求服务器接口
						api
							.http({
								url: '/login',
								params,
								method: 'post'
							})
							.then((res) => {
								if (res.status == 200) {
									wx.setStorage({
										key: 'userinfo',
										data: res.data
									});
									wx.setStorage({
										key: 'token',
										data: res.message,
										success: () => {
											resolve(res);
										}
									});
								} else {
									reject(res);
								}
							})
							.catch((reason) => reject(reason));
					}
				});
			},
			fail: (e) => {
				reject(e);
			}
		});
	});
}

module.export = {
	login
};
