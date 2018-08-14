

var detailP = {
	detailData:null,
	subscribeDetail:function(){
		util.Post(apiUrl.appointGetDetail,{
			branchNo:util.getUrlParam("branchNo"),
			queueNo:util.getUrlParam("queueNo"),
			businessType:util.getUrlParam("businessType"),
			appointDate:util.getUrlParam("appointDate"),
			idCard:util.getUrlParam("idCard")
		},function(res){
			detailP.detailData = res;
			$("#name").text(res.idName);
			$("#idCard").text(res.IdCard);
			$("#mobile").text(res.phone);
			$("#brank").text(res.branchName);
			$("#business").text(res.businessType);
			$("#dataTime").text(res.appoint_date);
			if(res.status==0){
				$("#cancelBtn").show();
			}
		});
	}
}
$(function(){
	
	
})
