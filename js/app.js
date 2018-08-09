var globalData = {
	postUrl:"11"
}
var clogin = {
	
}
var storageKey = {
	openId:"wxReserve_openId"
}
var util = { 
	ajax: function (url, type, dataType,async, data, callback,pBack,ecallback) {//pBack 当 pBack为true时表示自定义success   
		//$.showLoading("正在加载..."); 
        $.ajax({  
            url: url,
            type: type,
            dataType: dataType,
            data: data,
            async:async,
            success: function(data){
            	//$.hideLoading(); 
            	if(pBack){
            		callback(data);
            	}else{
            		if(data.code == 1){
            			callback(data.data); //响应成功  直接拿data
            		}else{//code  = 100  登录失效请重新登录
            			mui.toast(data.message); //响应失败  弹出错误信息
            		}
            	}
            },
            beforeSend: function() {},
            complete: function () { },
            error: function (xhr, errorType, error) {
            	 $.hideLoading(); 
                if(util.isFunction(ecallback)){
                	ecallback();
                }else{
                	$.toast("服务器繁忙", "text");
                }
            }
        })
    },
    Get: function (url, data, callback,pBack,ecallback) {this.ajax(globalData.postUrl, 'GET', 'json',true, data, callback,pBack,ecallback)},
	Post: function (methodT,data, callback,pBack,ecallback) {this.ajax(globalData.postUrl, 'POST', 'json',true, data, callback,pBack,ecallback)},
	PostAsynF: function (methodT,data, callback,pBack,ecallback) {this.ajax(globalData.postUrl, 'POST', 'json',false, data, callback,pBack,ecallback)},
	formartDate: function(date, formatStr){ 
	 	var str = formatStr;
		str = str.replace(/yyyy|YYYY/, date.getFullYear());
		str = str.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
		str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
		str = str.replace(/HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
		str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
		str = str.replace(/ss/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
		return str;
	},
	isIos: function () {return !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)==true?true:false;}, //ios
    isAndroid: function () { return this.ua.match(/Android/i)},//安卓
    isWeixin: function () {return this.ua.match(/MicroMessenger/i);},//微信
    isType: function (obj, type) { return Object.prototype.toString.call(obj) === '[object ' + type + ']'},
    isArray: function (arr) {return this.isType(arr, 'Array')},
    isObject: function (obj) {return this.isType(obj, 'Object')},
    isFunction: function (fn) {return this.isType(fn, 'Function') },
    getUrlParamLast:function(name){
		var url = location.search;  var theRequest = new Object();
	    if (url.indexOf("?") != -1) {var str = url.substr(1); strs = str.split("&");  for(var i = 0; i < strs.length; i ++) {theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);}}
	    if(theRequest[name]){return theRequest[name];}else{return "";}
	},
	//有相同的则获取第一个
	getUrlParam: function (param) {var t = new RegExp("(^|&)" + param + "=([^&]*)(&|$)"), n = window.location.search.substr(1).match(t);return null != n ? unescape(n[2]) : "";},
	//获取参数 能获取中文和超链接  参数经过encodeURIComponent编码等都可以用这个
	getUrlParamZw: function (param) {var t = new RegExp("(^|&)" + param + "=([^&]*)(&|$)"), n = window.location.search.substr(1).match(t);return null != n ? decodeURIComponent(n[2]) : "";},
	validateMobile: function(mobile){if(mobile==''){return false;}var p1 = /^1[0-9]{10}$/;  return p1.test(mobile);},
	isCardNo:function(card){if(card ==""){return false;} var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; return pattern.test(card);},
	isNoLogin:function(){if(localStorage.getItem(storageKey.openId)){return true;}else{return false;}}
}
