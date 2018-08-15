var subscibeP = {
	branchList:function(data){
		var brankDiv = $("#brankList");
		util.Get(apiUrl.branchGetBranchList,{},function(res){
			if(res.length == 0){$(".noting-view").show();$("#primaryBtn").hide();}else{$("#subscribeToDay").show();$(".noting-view").hide();}
			for(var i=0;i < res.length;i++){
				brankDiv.append(subscibeP.innerHtml(res[i]));
			}
		});
		
	},
	innerHtml : function(child){
		var ht ='<a class="weui-cell weui-cell_access" href="business_select.html?branchNo='+child.branchNo+'">'
			   +'<div class="weui-cell__bd">'
			   +'<p>'+child.branchName+'</p>'
			   +'<p class="gray" >'+child.branchAddr+'</p>'
			   +'</div>'   
			   +'<div class="weui-cell__ft"></div>'
			   +' </a>';
		return ht;
	}
}

$(function(){
	subscibeP.branchList();
	$("#primaryBtn").click('click',function(){
		location.href = "subscribe_list.html?todaySub=true"
	})
})
