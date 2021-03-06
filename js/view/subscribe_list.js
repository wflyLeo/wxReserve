var subP = {
	subList:function(todayFlag){
		var brankDiv = $("#subList");brankDiv.html("");
		util.Post(apiUrl.appointGetList,{
				openid:localStorage.getItem(storageKey.openId),
				todayFlag:todayFlag
		},function(res){
			if(res.length == 0){
				if(todayFlag==0){$(".text").html("今天您还没有任何预约信息哦@^@</br><a class='a-color reloadAll aclick'>点击查看全部预约<a/>");}else{$(".text").html("您还没有任何预约信息哦@^@");}
				$(".noting-view").show();$("#defaultBtn").hide();
			}else{
				$("#subscribeToDay").show();$(".noting-view").hide();
				if(todayFlag==0){$("#defaultBtn").show();}else{$("#defaultBtn").hide();}
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
	subP.subList(util.getUrlParam("todaySub")?0:1);
	$("#primaryBtn").click(function(){
		location.href = "subscribe_select.html";
	})
	$(document).on('touchstart','.reloadAll',function(){
		subP.subList(1);
	})
	
})
