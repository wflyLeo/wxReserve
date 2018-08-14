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
	yArr:[],
	dateArr:[],
	businessArr:[],
	appintTimePeriodInfo :function(){
		 console.log("请求参数：branchNo="+fillP.branchNo+"，queueNo="+fillP.queueNo+"，businessType="+fillP.businessType+"，appointDate="+fillP.appointDate);
		 util.Post(apiUrl.branchGetAppintTimePeriodInfo,{
		 	branchNo:fillP.branchNo,
		 	queueNo:fillP.queueNo,
		 	businessType:fillP.businessType,
		 	appointDate: fillP.appointDate.replace(/\-/g,"")
		 },function(res){
		 	 console.log(JSON.stringify(res));
			var bArr = [];
			var data = res.timePeriodInfo;
			if(data.length==0){$.toast("预约时间端为空，请联系管理员", "text");return;}
			for(var i=0;i<data.length;i++){
				var tem = {
					label:data[i].startTime+"-"+data[i].endTime+"（可预约数"+data[i].remainder+"）",
					value:data[i]
				}
				bArr.push(tem);
			}
			fillP.dateBtArr = bArr;
		});
	},
	getAppintDateInfo:function(){
		util.Get(apiUrl.branchGetAppintDateInfo,{},function(res){
			var bArr = [];
			for(var i=0;i<res.length;i++){
				var tem = {
					label:res[i],
					value:res[i]
				}
				bArr.push(tem);
			}
			fillP.dateArr = bArr;
			fillP.appointDate = res[0];
			fillP.appintTimePeriodInfo();
		})
	},
	businessList:function(){
		util.Post(apiUrl.branchGetBusinessInfo,{
			branchNo: fillP.branchNo
		},function(res){
			var bArr = [];
			for(var i=0;i<res.length;i++){
				var tem = {
					label:res[i].businessInfo.businessName,
					value:res[i].businessInfo
				}
				bArr.push(tem);
			}
			fillP.businessArr = bArr;
		});
		
	},
	getUserInfo:function(){
		util.Post(apiUrl.userGetInfoByOpenId,{openid:localStorage.getItem(storageKey.openId)},function(res){
			fillP.IdCard = res.IdCard;
			fillP.IdName = res.IdName;
			fillP.phone = res.phone;
		});
	},
	submitSubscribe:function(obj){
		if(fillP.appointDate==""){$.toast("请选择预约日期", "text");return;}
		if(fillP.startTime==""||fillP.endTime==''){$.toast("请选择预约时间段", "text");return;}
		console.log(fillP.appointDate);
		util.Post(apiUrl.appointSaveAppointInfo,{
			branchNo:fillP.branchNo,
			queueNo:fillP.queueNo,
			businessType:fillP.businessType,
			appointDate:fillP.appointDate,
			startTime:fillP.startTime,
			endTime:fillP.endTime,
			idCard: fillP.IdCard?fillP.IdCard:"124234",
			idName: fillP.IdName?fillP.IdCard:"124234",
			phone: fillP.phone?fillP.IdCard:"124234"
		},function(res){
			$.toast("预约成功",function(){
				location.href = "subscribe_list.html";
			});
		});
	}
}
$(function(){
	fillP.getAppintDateInfo();
	fillP.businessList();
	//fillP.getUserInfo();
	$("#showPicker").val(util.getUrlParamZw("businessName"));
	$('#showPicker').on('click', function () {
        weui.picker(fillP.businessArr, {
            onChange: function (result) {},
            onConfirm: function (result) {
            	 fillP.businessType = result[0].businessType;
                 fillP.queueNo = result[0].queueNo;
                 $("#showPicker").val(result[0].businessName);
                 $("#dateBetween").val("");//清空子选折器的值
            }
        });
    });
	
    $('#showDatePicker').on('click', function () {
        weui.picker(fillP.dateArr, {
            onChange: function (result) { },
            onConfirm: function (result) {
            	fillP.appointDate = result[0];
                $("#showDatePicker").val(result[0]);
                $("#dateBetween").val("");//清空子选折器的值
                fillP.appintTimePeriodInfo();//重新查询值
            }
        });
    });
   
    $('#dateBetween').on('click', function () {
    	if($("#showDatePicker").val().trim()==''){$.toast("请选择日期", "text");return;}
        weui.picker(fillP.dateBtArr, {
            onChange: function (result) { },
            onConfirm: function (result) {
                $("#dateBetween").val(result[0].startTime+"-"+result[0].endTime);
                fillP.startTime = result[0].startTime;
                fillP.endTime = result[0].endTime;
            }
        });
    });
    
    $('#primaryBtn').on('click', function () {
  		if($("#showPicker").val().trim()==''){$.toast("请选择预约业务", "text");return;}
  		if($("#showDatePicker").val().trim()==''){$.toast("请选择预约日期", "text");return;}
  		if($("#dateBetween").val().trim()==''){$.toast("请选择预约时间段", "text");return;}
  		util.btnDisableT(this,1)
  		fillP.submitSubscribe(this);
       
    });
})
