module.exports = function(){

	var _res  = arguments[0];
	var _req  = arguments[1];
	var querystring = require('querystring');
	
	this.checkSession = function(model){
		if(model == 'login'){
			return true;
		}else if(lib.session.username && lib.session.username != '') {
			return true;
		} 
		return false;
	}
	//post方式读取数据，登入系统，并且写入session。读取房间数据
	this.login = function(){
		var room = lib.config.get(CONF + 'room.json', '');
		var username,password;
		/*异步函数在直接执行时会出错
		lib.httpParam.POST('username', function(value){
		 	username = value;
		 	// console.log('333333'+value);
		 });
		 // console.log('222222'+username);
		 lib.httpParam.POST('password',function(value){
		 	password = value;
		 });
		*/
	var postData = '';
	_req.addListener('data', function(postDataChunk) {
        postData += postDataChunk;
    });
    _req.addListener('end', function() {
        // 数据接收完毕，执行回调函数
        var db = new DB();
        var param = querystring.parse(postData);
        username = param['username'];
        password = param['password']; 
        var result = db.selectuser(username,password);
        // console.log("?????????"+result);
		if (!result) {
			lib.session.username = username;
        	_res.render(VIEW + 'main.jade', {'user' : username, 'rooms' : room});
    	}
    	else{
    		_res.render(VIEW + 'index.jade');
    	}
    });
        return;
	}
	//get方式读取房间的ID号码
	this.enterRoom = function(){
		var roomId = lib.httpParam.GET('room_id');
		//第一次读入房间信息，onlineList将其置空
		if(!onlineList[roomId]){
			onlineList[roomId] = [];
		}
		if(!onlineList['pic']){
			onlineList['pic'] = [];
		}

		var time = 0;
			// 创建socket，等待客户端连接。回调函数，处理客户端的请求
            io.sockets.on('connection', function (socket){
                var  username = lib.session.username;
                // 用户没有登录，返回结束
				if(!username){
					return;
				}
				// console.log('##################'+socket);
				//如果用户第一次进聊天室，保存用户的名字，socket，和图片地址
                if(!onlineList[roomId][username] ){
                    onlineList[roomId][username] = socket;
					onlineList['pic'][username] = {'pic':'picture' + parseInt(Math.random()*2+1) + '.png', 'name':username};
                }
                //更新在线的用户
                var refresh_online = function(){
                    var n = [];//每个房间中的人名
					var p = [];//每个房间中的人的图片
                    for (var i in onlineList[roomId]){
                        n.push(i);
						p.push(onlineList['pic'][i]);
                    }
                    io.sockets.emit('online_list', n);//所有人广播聊天室中人的姓名
					// console.log(onlineList['pic']);
					io.sockets.emit('pic_list', p);//所有人广播聊天室中人的图片
                }
                refresh_online();
                //确保每次发送一个socket消息
                if(time > 0){
                    return;
                }
                //等待消息名为public的消息
                socket.on('public', function(data){
                    io.sockets.emit('msg', 'hi all');
                });
                //等待退出请求
                socket.on('disconnect', function(){
                    delete onlineList[roomId][username];
                    refresh_online();
                });
                time++;
				// console.log(onlineList);
            });
			_res.render(VIEW + 'live.jade',{'user':lib.session.username});
	}
	//客户发送消息，使用socket发送Json数据包
	this.say = function(){
		var username = lib.session.username;
		var msg = lib.httpParam.GET('msg');
		var retJson = {};
		retJson['msg'] = msg;
		retJson['name'] = username;
		io.sockets.emit('say_msg', retJson);
	}
}