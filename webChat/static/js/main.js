var socket = io.connect();//连接到服务器的socket，服务器socket地址(localhost)忽略
//从服务器获取新上线用户姓名
socket.on('online_list', function (data) {
    var Dom = '';
    for(var i=0; i<data.length; i++){
        Dom = Dom + "<li><a href='javascript:void(0)'>" + data[i] + "</a></li>";
        $(".friend_list").html(Dom);
    }
});
//从服务器获取新上线用户图片
socket.on('pic_list', function (data) {
	var Dom = '';
	for(var i=0; i<data.length; i++){
		var userInfo = data[i];
		var Dom = Dom + "<li class='span4' id='" + userInfo.name + "'>"+"<span style='margin-left:80px'> <img width='50px' height='50px' src='/static/image/" + userInfo.pic + "'></img></span>"+"<a href='#'><span  style='margin-left:70px'>" + userInfo.name + "</span>" + "</a><span class='msg_detail'></span></li>";
		$(".tab_list").html(Dom);
	}
});
//获取聊天的信息
socket.on('say_msg', function (data) {
    var username = data['name'];
	var dom = "<div class='alert'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Tips:</strong>" + data['msg'] + "</div>";
	$('#'+username).find('.msg_detail').html(dom);;
});

//有什么用？
socket.on('msg', function (data) {
    var Dom = " <li><span  class='icon-user'></span><span class='live_user_name text-success'>[danhuang]</span><span class='live_message text-info'>" + data.msg + "</span></li>";
    $($('.live_area').find('ul').find('li').eq(0)).before(Dom);
});
//有什么用？
socket.on('live_data', function (data) {
    $('.live_area').find('ul').html(data);
});
//有啥用？
$("#send_msg").click(function(){
    var msg = $('textarea').val();
    socket.emit('public',{'msg' : msg});
});
//有啥用？
$("#send_msg").click(function(){
    var msg = $('textarea').val();
    socket.emit('public',{'msg' : msg});
});
//点击发送消息，发送给服务器
$("#msg_post").click(function(){
	var msg = $('#msg_value').val();
	$.get('/login/say', {'msg':msg}, function(data){
	});
});

