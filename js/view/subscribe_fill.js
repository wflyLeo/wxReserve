var fillP = {
	IdCard:"",
	IdName:"",
	phone:"",
	branchNo:util.getUrlParam("branchNo"),
	businessType:util.getUrlParam("businessType"),
	queueNo:util.getUrlParam("queueNo"),
	startTime:"",
	endTime:"",
	appointDate:"",
	dateBtArr:[],
	dateArr:[],
	businessArr:[],
	appintTimePeriodInfo :function(){
		if(fillP.appointDate==""){return;}
		 util.Post(apiUrl.branchGetAppintTimePeriodInfo,{
		 	branchNo:fillP.branchNo,
		 	queueNo:fillP.queueNo,
		 	businessType:fillP.businessType,
		 	appointDate: fillP.appointDate.replace(/\-/g,"")
		 },function(res){
			var data = res.timePeriodInfo;
			fillP.dateBtArr = data;
			if(data.length==0){$.toast("预约时间端为空，请联系管理员", "text");return;}
			fillP.dataBtInnerHtml(data);
		});
	},
	getAppintDateInfo:function(){
		util.Get(apiUrl.branchGetAppintDateInfo,{},function(res){
			fillP.dataInnerHtml(res);
		})
	},
	businessList:function(){
		util.Post(apiUrl.branchGetBusinessInfo,{
			branchNo: fillP.branchNo
		},function(res){
			 console.log(JSON.stringify(res));
			fillP.businessArr = res;
			fillP.showPickerInnerHtml(res);
		});
	},
	getUserInfo:function(){
		util.Post(apiUrl.userGetInfoByOpenId,{openid:localStorage.getItem(storageKey.openId)},function(res){
			fillP.IdCard = res.idCard;
			fillP.IdName = res.idName;
			fillP.phone = res.phone;
			fillP.getAppointCount(res.idCard);
		});
	},
	submitSubscribe:function(){
		if(fillP.appointDate==""){$.toast("请选择预约日期", "text");return;}
		if(fillP.startTime==""||fillP.endTime==''){$.toast("请选择预约时间段", "text");return;}
		util.Post(apiUrl.appointSaveAppointInfo,{
			branchNo:fillP.branchNo,
			queueNo:fillP.queueNo,
			businessType:fillP.businessType,
			appointDate:fillP.appointDate.replace(/\-/g,""),
			startTime:fillP.startTime,
			endTime:fillP.endTime,
			idCard: fillP.IdCard,
			idName: fillP.IdName,
			phone: fillP.phone
		},function(res){
			$.toast("预约成功",function(){
				location.href = "subscribe_list.html";
			});
		});
	},
	confirmAppointInfo:function(){
		util.Post(apiUrl.appointConfirmAppointInfo,{
			branchNo:fillP.branchNo,
			queueNo:fillP.queueNo,
			businessType:fillP.businessType,
			appointDate:fillP.appointDate.replace(/\-/g,""),
			startTime:fillP.startTime,
			endTime:fillP.endTime,
			idCard: fillP.IdCard,
			idName: fillP.IdName,
			phone: fillP.phone
		},function(res){
			if(res.code == '200'){
				fillP.submitSubscribe();
			}else if(res.code == '500'){
				 $.confirm("您该天已有预约，是否选择覆盖", function() {
				 	 fillP.submitSubscribe();
				  }, function() {
				 	 //点击取消后的回调函数
				  });
			}else{
				$.toast(res.message, "text");
			}
		},true)
	},
	getAppointCount:function(idCard){
		util.Post(apiUrl.getAppointCount,{
			idCard: idCard
		},function(res){
			$("#subNumber").text(res);
		})
	},
	showPickerInnerHtml:function(list){
		var showD = $("#showPicker");showD.html('');
		for(var i =0 ;i<list.length;i++){
			if(fillP.businessType==list[i].businessInfo.businessType){
				showD.append('<option value="'+i+'"selected = "selected">'+list[i].businessInfo.businessName+'</option>');
			}else{
				showD.append('<option value="'+i+'">'+list[i].businessInfo.businessName+'</option>');
			}
		}
	},
	dataInnerHtml:function(list){
		var showD = $("#showDatePicker");showD.html('<option value="-1">请选择预约日期</option>');
		for(var i =0 ;i<list.length;i++){
			showD.append('<option value="'+list[i]+'">'+list[i]+'</option>');
		}
	},
	dataBtInnerHtml:function(list){
		var showD = $("#dateBetween");showD.html('<option value="-1">请选择预约时间段</option>');
		for(var i =0 ;i<list.length;i++){
			if(list[i].remainder<=0){
				showD.append('<option value="'+i+'" disabled=true>'+list[i].startTime+'-'+list[i].endTime+'（可预约数'+list[i].remainder+'）'+'</option>');
			}else{
				showD.append('<option value="'+i+'" >'+list[i].startTime+'-'+list[i].endTime+'（可预约数'+list[i].remainder+'）'+'</option>');
			}
		}
	},
	cleanApointTime:function(){//清空时间端得值
		$("#dateBetween").html('<option value="0">请选择预约时间段</option>');
		fillP.startTime ="";fillP.endTime="";
	}
}
$(function(){
	fillP.businessList();
	fillP.getAppintDateInfo();
	fillP.getUserInfo();
	$('#showPicker').change(function () {
	  var  vObj = fillP.businessArr[$("#showPicker").val()];
      fillP.businessType = vObj.businessInfo.businessType;
      fillP.queueNo = vObj.businessInfo.queueNo;
      fillP.cleanApointTime();
      fillP.appintTimePeriodInfo();//重新查询值
    });
	
    $('#showDatePicker').change(function () {
    	if($("#showDatePicker").val()==-1){
    		fillP.appointDate = "";
    	}else{
    		fillP.appointDate = $("#showDatePicker").val();
    	}
		fillP.cleanApointTime();
   		fillP.appintTimePeriodInfo();//重新查询值
    });
   
    $('#dateBetween').change(function () {
    	if($("#dateBetween").val()==-1){
    		 fillP.startTime ="";
    		 fillP.endTime = "";
    	}else{
    		var  vObj = fillP.dateBtArr[$("#dateBetween").val()];
	    	 fillP.startTime = vObj.startTime;
	    	 fillP.endTime = vObj.endTime;
    	}
    	 
    });
    
    $('#primaryBtn').on('click', function () {
  		if($("#showPicker").val()==''){$.toast("请选择预约业务", "text");return;}
  		if($("#showDatePicker").val()=='-1'){$.toast("请选择预约日期", "text");return;}
  		if($("#dateBetween").val()=='-1'){$.toast("请选择预约时间段", "text");return;}
  		util.btnDisableT(this,1)
  		fillP.confirmAppointInfo();
    });
})
