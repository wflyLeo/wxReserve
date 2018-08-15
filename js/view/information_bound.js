
$(function(){
	
	$("#primaryBtn").click(function(){
		var socialCard = $("#socialCard").val();
		var phone = $("#phone").val();
		var password = $("#password").val();
		if(socialCard.trim()==''){$.toast("请输入社保号码","text");return;}
		if(!util.validateMobile(phone)){$.toast("请输入有效手机号","text");return;}
		if(password.trim()==''){$.toast("请输入密码","text");return;}
		util.Post(apiUrl.userBindInfo,{
			openid:localStorage.getItem(storageKey.openId),
			login_name:'1234',
			phone:phone,
			password:'5678'
		},function(res){
			$.toast('绑定成功',function(){
				location.href = "subscribe_select.html";
			})
		})
		//location.href = "subscribe_select.html"
	})
	
})
