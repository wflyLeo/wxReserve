var subP = {
	subList:function(){
		var todayFlag = util.getUrlParam("todaySub")?0:1;
		var brankDiv = $("#subList");
		util.Post(apiUrl.appointGetList,{
				openid:localStorage.getItem(storageKey.openId),
				todayFlag:todayFlag
		},function(res){
			if(res.length == 0){
				if(todayFlag==1){$(".noText").text("今天您还没有任何预约信息哦@^@");}
				$(".noting-view").show();}else{$("#subscribeToDay").show();$(".noting-view").hide();
			}
			for(var i=0;i < res.length;i++){	
				brankDiv.append(subP.innerHtml(res[i]));
			}
			$("#primaryBtnP").show();
		});
		
	},
	innerHtml : function(child){
		var ht ='<a class="weui-cell weui-cell_access" href="subscribe_detail.html?branchNo='+child.branchNo
			   +'&branchNo='+child.branchNo
			   +'&queueNo='+child.queueNo
			   +'&appointDate='+child.appointDate
			   +'&idCard='+child.idCard
			   +'&businessType='+child.businessType
			   +'">'
			   +'<div class="weui-cell__bd">'
			   +'<p>'+child.businessName+'</p>'
			   +'<p class="gray">'+util.strToDate(child.appointDate)+'   '+child.startTime+'-'+child.endTime+'</p>'
			   +'</div>'   
			   +'<div class="weui-cell__ft">'
			   +'<span class="weui-badge badge-text '+ util.subscribeStatsColor(child.status)
			   +'" >'+util.subscribeStatsText(child.status)+'</span>'
			   +'</div>'
			   +' </a>';
		return ht;
	}
}

$(function(){
	subP.subList();
	$("#primaryBtn").click(function(){
		location.href = "subscribe_select.html";
	})
	
})
