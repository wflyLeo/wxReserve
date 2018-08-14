var subP = {
	subList:function(todayFlag){
		var brankDiv = $("#subList");
		util.Post(apiUrl.appointGetList,{
				openid:"1234",todayFlag:todayFlag
			},function(res){
			if(res.length == 0){$(".noting-view").show();$("#primaryBtn").hide();}else{$("#subscribeToDay").show();$(".noting-view").hide();}
			for(var i=0;i < res.length;i++){
				brankDiv.append(subP.innerHtml(res[i]));
			}
		});
		
	},
	innerHtml : function(child){
		var ht ='<a class="weui-cell weui-cell_access" href="subscribe_detail.html?branchNo='+child.branchNo
			   +'&branchNo='+child.branchNo
			   +'&queueNo='+child.queueNo
			   +'&appointDate='+child.appointDate
			   +'&idCard='+child.idCard
			   +'">'
			   +'<div class="weui-cell__bd">'
			   +'<p>'+child.businessName+'</p>'
			   +'</div>'   
			   +'<div class="weui-cell__ft">'
			   +'<span class="weui-badge badge-text'+(child.status==-1?' color-gray':' ')+'" >'+util.subscribeStatsText(child.status)+'</span>'
			   +'</div>'
			   +' </a>';
		return ht;
	}
}

$(function(){
	subP.subList(0);
	
})
