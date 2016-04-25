$('#register').click(function(){
	window.location.href = '/register/index';
});
$('#register-btn').click(function(){
	var flag = true;
	var str = '';
	if ($("input[name='nickname']").val()=="") {
		str = 'nickname is null';
		$('#notice').text(str);
		flag = false;
		return flag;
	}
	if ($("input[name='email']").val()=="") {
		str = 'email null';
		$('#notice').text(str);
		flag = false;
		return flag;
	}
	if ($("input[name='sex']").val()=="") {
		str = 'sex null';
		$('#notice').text(str);
		flag = false;
		return flag;
	}
	if ($("input[name='passwd']").val()=="") {
		str = 'password null';
		$('#notice').text(str);
		flag = false;
		return flag;
	}
	if ($("input[name='repasswd']").val()==""&&$("input[name='repasswd']").val()!=$("input[name='passwd']").val()) {
		str = 'password not match';
		$('#notice').text(str);
		flag = false;
		return flag;
	}
	return flag;
});