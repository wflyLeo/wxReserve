var infoP = {
	socialCard:"",
	phone:"",
	password:"",
	comfireBind:function(){
		util.Post(apiUrl.shebaoComfireBind,{
			login_name: infoP.socialCard
		},function(res){
			if(res.code == '200'){
				infoP.userBindInfo();
			}else if(res.code == '500'){
				 $.confirm("该社保卡已绑定其他微信号，是否覆盖绑定?", function() {
				 	 infoP.userBindInfo();
				  }, function() {
				 	 //点击取消后的回调函数
				  });
			}else{
				$.toast(res.message, "text");
			}
		},true)
	},
	userBindInfo:function(){
		util.Post(apiUrl.userBindInfo,{
			openid: localStorage.getItem(storageKey.openId),
			login_name: infoP.socialCard,
			phone: infoP.phone,
			password: infoP.password
		},function(res){
			$.toast('绑定成功',function(){
				location.href = "subscribe_select.html";
			})
		})
	},
	paramInit:function(socialCard,phone,password){
		infoP.socialCard = socialCard;
		infoP.phone = phone;
		infoP.password = password;
	}
}
$(function(){
	$("#primaryBtn").click(function(){
		var socialCard = $("#socialCard").val();
		var phone = $("#phone").val();
		var password = $("#password").val();
		if(socialCard.trim()==''){$.toast("请输入社保号码","text");return;}
		if(!util.validateMobile(phone)){$.toast("请输入有效手机号","text");return;}
		if(password.trim()==''){$.toast("请输入密码","text");return;}
		util.btnDisableT(this,1);
		infoP.paramInit(socialCard,phone,password);
		infoP.comfireBind();
	})
	
})
