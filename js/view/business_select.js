var subscibeP = {
	businessList:function(data){
		var brankDiv = $("#businessList");
		util.Post(apiUrl.branchGetBusinessInfo,{
			branchNo: util.getUrlParam("branchNo")
		},function(res){
			if(res.length == 0){$(".noting-view").show();$("#primaryBtn").hide();}else{$(".noting-view").hide();}
			for(var i=0;i < res.length;i++){
				brankDiv.append(subscibeP.innerHtml(res[i].businessInfo));
			}
		});
		
	},
	innerHtml : function(child){
		var ht ='<a class="weui-cell weui-cell_access" href="subscribe_fill.html?branchNo='+util.getUrlParam("branchNo")
			   +'&queueNo='+child.queueNo+'&businessType='+child.businessType+'&businessName='+encodeURIComponent(child.businessName)
			   +'">'
			   +'<div class="weui-cell__bd">'
			   +'<p>'+child.businessName+'</p>'
			   +'</div>'   
			   +'<div class="weui-cell__ft"></div>'
			   +' </a>';
		return ht;
	}
}

$(function(){
	subscibeP.businessList();
	
})