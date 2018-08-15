var globalData = {
	postUrl:"http://20z2641l41.iok.la:39271/wxReserve/"
}
var apiUrl = {
	userGetOpenId:"user/getOpenId", //获取用户OpenId接口  get
	userBindInfo:"user/bindInfo", //用户绑定接口 post
	userGetInfoByOpenId:"user/getInfoByOpenId", //获取用户信息接口 post
	branchGetBranchList:"branch/getBranchList", //获取机构列表接口 get
	branchGetBusinessInfo:"branch/getBusinessInfo", //根据机构号获取可预约的业务列表 post
	branchGetAppintDateInfo:"branch/getAppintDateInfo", //获取可预约的日期列表接口 get
	branchGetAppintTimePeriodInfo:"branch/getAppintTimePeriodInfo", //  获取可以预约的时间段和剩余可预约人数列表 post
	appointSaveAppointInfo:"appoint/saveAppointInfo", //提交预约接口 post
	appointGetList:"appoint/getList", //获取预约记录接口 post
	appointGetDetail:"appoint/getDetail", //获取预约详细接口 post
	appointCancel:"appoint/cancel", //取消预约接口 post
	appointConfirmAppointInfo:"appoint/confirmAppointInfo",
	getAppointCount:"appoint/getAppointCount"
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
            		if(data.code == 200){
            			callback(data.data); //响应成功  直接拿data
            		}else{//code  = 100  登录失效请重新登录
            			$.toast(data.message, "text");
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
    Get: function (methodT, data, callback,pBack,ecallback) {this.ajax(globalData.postUrl+methodT, 'GET', 'json',true, data, callback,pBack,ecallback)},
	Post: function (methodT,data, callback,pBack,ecallback) {this.ajax(globalData.postUrl+methodT, 'POST', 'json',true, data, callback,pBack,ecallback)},
	PostAsynF: function (methodT,data, callback,pBack,ecallback) {this.ajax(globalData.postUrl+methodT, 'POST', 'json',false, data, callback,pBack,ecallback)},
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
    isEmpty: function (obj) {
        if (!obj) { return true}
        if (this.isArray(obj) && obj.length === 0) {return true}
        if (this.isString(obj)&&obj == "undefined") {return true}
        if (this.isObject(obj) && Object.keys(obj).length === 0) { return true}
        return false
    },
    isString: function (arr) {return this.isType(arr, 'String')},
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
	isNoLogin:function(){if(localStorage.getItem(storageKey.openId)){return true;}else{return false;}},
	subscribeStatsText:function(key){
		switch(key){
			case 0: return "已预约";break;
			case 1: return "已取号";break;
			case 2: return "叫号";break;
			case 3: return "已完成";break;
			case -1: return "已取消";break;
			default: return  "未知";break;
		}
	},
	subscribeStatsColor:function(key){
		switch(key){
			case 0: return "";break;
			case 1: return "quhao-bcolor";break;
			case 2: return "jiaohao-bcolor";break;
			case 3: return "wancen-bcolor";break;
			case -1: return "color-gray";break;
			default: return  "weizhi-bcolor";break;
		}
	},
	btnDisableT: function (obj,t,isWait){ /*设置t秒内不能重复点击，obj为当前对象*/
		var ot = t || 3000;
		if(isWait){
			var v = obj.value;
		   	var i = setInterval(function(){
		        if(ot > 0) {obj.value = ot--+'秒';obj.disabled = true;} else {window.clearInterval(i);obj.value = v;obj.disabled = false; }
		    }, 1000);
		}else{
			obj.disabled = true;
		 	var i = setInterval(function(){
		        if(ot > 0) { ot--;} else {window.clearInterval(i);obj.disabled = false;}
		    }, 1000);
		}
	},
	init:function(){
		$.toast.prototype.defaults.duration = 1300;
		if(!util.isEmpty(util.getUrlParam("wxReserveOpenId"))){ //获取openid
			localStorage.setItem(storageKey.openId,util.getUrlParam("wxReserveOpenId"));
		}
	}
}

$(function(){
	util.init();
	localStorage.setItem(storageKey.openId,"1234");
})
