const api = require('./api.js');

function login() {
	return new Promise((resolve, reject) => {
		//先调用 wx.login 获取code
		wx.login({
			success: (res) => {
				//调用 getUserInfo 获取用户信息 用于生成 UnionID
				console.log(res);
				wx.getUserInfo({
					// 返回res 含有 rawData, userinfo,signature, encryptedData, i
					success: ({ rawData, signature, encryptedData, iv }) => {
						let params = {
							function: '2',
							code: res.code,
							rawData,
							signature,
							encryptedData,
							iv
						};
						// 请求服务器接口
						api
							.http({
								url: '/test?',
								params,
								method: 'post'
							})
							.then((res) => {
								console.log(res);

								wx.setStorage({
									key: 'userinfo',
									data: res

									// wx.setStorage({
									// 	key: 'token',
									// 	data: res.message,
									// 	success: () => {
									// 		resolve(res);
									// 	}
									// });
								});
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

module.exports = {
	login
};
