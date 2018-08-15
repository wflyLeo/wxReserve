

var detailP = {
	detail:null,
	subscribeDetail:function(){
		util.Post(apiUrl.appointGetDetail,{
			branchNo:util.getUrlParam("branchNo"),
			queueNo:util.getUrlParam("queueNo"),
			businessType:util.getUrlParam("businessType"),
			appointDate:util.getUrlParam("appointDate"),
			idCard:util.getUrlParam("idCard")
		},function(res){
			detailP.detail = res;
			$("#name").text(res.idName);
			$("#idCard").text(res.idCard);
			$("#mobile").text(res.phone);
			$("#brank").text(res.branchName);
			$("#business").text(res.busienssName);
			$("#dataTime").text(res.appointDate);
			$("#dataTimeBt").text(res.startTime+"-"+res.endTime);
			$("#status").text(util.subscribeStatsText(res.status));
			if(res.status==0){
				$("#cancelBtn").removeClass('hiden');
			}else if(res.status==1){
				$("#waitingCount").text(res.waitingCount);
				$("#waitingTime").text(res.waitingTime);
				$("#waitingCountP").show();
				$("#waitingTimeP").show();
			}
		});
	},
	cancelSubscribe:function(){
		util.Post(apiUrl.appointCancel,{
			branchNo:util.getUrlParam("branchNo"),
			queueNo:util.getUrlParam("queueNo"),
			businessType:util.getUrlParam("businessType"),
			appointDate:util.getUrlParam("appointDate"),
			idCard:util.getUrlParam("idCard")
		},function(res){
			$.toast("取消预约成功",function(){
				location.href = 'subscribe_list.html';
			});
		});
	}
}
$(function(){
	detailP.subscribeDetail();
	
	$("#cancelBtn").click(function(){
		detailP.cancelSubscribe();
	})
	
})
