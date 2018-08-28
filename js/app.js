var prod_E = true;
var globalData = {
	postUrl: prod_E ? "http://wxyy.nbjbhrss.gov.cn/wx/" : "http://20z2641l41.iok.la:39271/wxReserve/"
};
var apiUrl = {
	userGetOpenId: "user/getOpenId",
	userBindInfo: "user/bindInfo",
	userGetInfoByOpenId: "user/getInfoByOpenId",
	branchGetBranchList: "branch/getBranchList",
	branchGetBusinessInfo: "branch/getBusinessInfo",
	branchGetAppintDateInfo: "branch/getAppintDateInfo",
	branchGetAppintTimePeriodInfo: "branch/getAppintTimePeriodInfo",
	appointSaveAppointInfo: "appoint/saveAppointInfo",
	appointGetList: "appoint/getList",
	appointGetDetail: "appoint/getDetail",
	appointCancel: "appoint/cancel",
	appointConfirmAppointInfo: "appoint/confirmAppointInfo",
	getAppointCount: "appoint/getAppointCount",
	shebaoComfireBind: "user/comfireBind"
};
var clogin = {};
var storageKey = {
	openId: "wxReserve_openId"
};
var util = {
	ajax: function(url, type, dataType, async, data, callback, pBack, ecallback) {
		$.ajax({
			url: url,
			type: type,
			dataType: dataType,
			data: data,
			async: async,
			success: function(data) {
				if(pBack) {
					callback(data)
				} else {
					if(data.code == 200) {
						callback(data.data)
					} else {
						$.toast(data.message, "text");
						console.log(data.message)
					}
				}
			},
			beforeSend: function() {},
			complete: function() {},
			error: function(xhr, errorType, error) {
				$.hideLoading();
				if(util.isFunction(ecallback)) {
					ecallback()
				} else {
					$.toast("服务器繁忙", "text")
				}
			}
		})
	},
	Get: function(methodT, data, callback, pBack, ecallback) {
		this.ajax(globalData.postUrl + methodT, "GET", "json", true, data, callback, pBack, ecallback)
	},
	Post: function(methodT, data, callback, pBack, ecallback) {
		this.ajax(globalData.postUrl + methodT, "POST", "json", true, data, callback, pBack, ecallback)
	},
	PostAsynF: function(methodT, data, callback, pBack, ecallback) {
		this.ajax(globalData.postUrl + methodT, "POST", "json", false, data, callback, pBack, ecallback)
	},
	formartDate: function(date, formatStr) {
		var str = formatStr;
		str = str.replace(/yyyy|YYYY/, date.getFullYear());
		str = str.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1));
		str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate());
		str = str.replace(/HH/, date.getHours() > 9 ? date.getHours().toString() : "0" + date.getHours());
		str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : "0" + date.getMinutes());
		str = str.replace(/ss/, date.getSeconds() > 9 ? date.getSeconds().toString() : "0" + date.getSeconds());
		return str
	},
	strToDate: function(st) {
		if(st && st.length == 8) {
			return st.substring(0, 4) + "-" + st.substring(4, 6) + "-" + st.substring(6, 8)
		} else {
			return st
		}
	},
	isIos: function() {
		return !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) == true ? true : false
	},
	isAndroid: function() {
		return this.ua.match(/Android/i)
	},
	isWeixin: function() {
		return this.ua.match(/MicroMessenger/i)
	},
	isEmpty: function(obj) {
		if(!obj) {
			return true
		}
		if(this.isArray(obj) && obj.length === 0) {
			return true
		}
		if(this.isString(obj) && obj == "undefined") {
			return true
		}
		if(this.isObject(obj) && Object.keys(obj).length === 0) {
			return true
		}
		return false
	},
	isString: function(arr) {
		return this.isType(arr, "String")
	},
	isType: function(obj, type) {
		return Object.prototype.toString.call(obj) === "[object " + type + "]"
	},
	isArray: function(arr) {
		return this.isType(arr, "Array")
	},
	isObject: function(obj) {
		return this.isType(obj, "Object")
	},
	isFunction: function(fn) {
		return this.isType(fn, "Function")
	},
	getUrlParamLast: function(name) {
		var url = location.search;
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1])
			}
		}
		if(theRequest[name]) {
			return theRequest[name]
		} else {
			return ""
		}
	},
	getUrlParam: function(param) {
		var t = new RegExp("(^|&)" + param + "=([^&]*)(&|$)"),
			n = window.location.search.substr(1).match(t);
		return null != n ? unescape(n[2]) : ""
	},
	getUrlParamZw: function(param) {
		var t = new RegExp("(^|&)" + param + "=([^&]*)(&|$)"),
			n = window.location.search.substr(1).match(t);
		return null != n ? decodeURIComponent(n[2]) : ""
	},
	validateMobile: function(mobile) {
		if(mobile == "") {
			return false
		}
		var p1 = /^1[0-9]{10}$/;
		return p1.test(mobile)
	},
	isCardNo: function(card) {
		if(card == "") {
			return false
		}
		var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		return pattern.test(card)
	},
	isNoLogin: function() {
		if(!localStorage.getItem(storageKey.openId)) {
			return true
		} else {
			return false
		}
	},
	subscribeStatsText: function(key) {
		switch(key) {
			case 0:
				return "已预约";
				break;
			case 1:
				return "已取号";
				break;
			case 2:
				return "已叫号";
				break;
			case 3:
				return "已完成";
				break;
			case -1:
				return "已取消";
				break;
			default:
				return "未知";
				break
		}
	},
	subscribeStatsColor: function(key) {
		switch(key) {
			case 0:
				return "";
				break;
			case 1:
				return "quhao-bcolor";
				break;
			case 2:
				return "jiaohao-bcolor";
				break;
			case 3:
				return "wancen-bcolor";
				break;
			case -1:
				return "color-gray";
				break;
			default:
				return "weizhi-bcolor";
				break
		}
	},
	btnDisableT: function(obj, t, isWait) {
		var ot = t || 3000;
		if(isWait) {
			var v = obj.value;
			var i = setInterval(function() {
				if(ot > 0) {
					obj.value = ot-- + "秒";
					obj.disabled = true
				} else {
					window.clearInterval(i);
					obj.value = v;
					obj.disabled = false
				}
			}, 1000)
		} else {
			obj.disabled = true;
			var i = setInterval(function() {
				if(ot > 0) {
					ot--
				} else {
					window.clearInterval(i);
					obj.disabled = false
				}
			}, 1000)
		}
	},
	init: function() {
		$.toast.prototype.defaults.duration = 1500;
		if(!util.isEmpty(util.getUrlParam("wxReserveOpenId"))) {
			localStorage.setItem(storageKey.openId, util.getUrlParam("wxReserveOpenId"))
		}
		if(util.isNoLogin()) {
			$.toast("登录已失效，请重新重入口进入", "text")
		}
	}
};
$(function() {
	util.init();
});