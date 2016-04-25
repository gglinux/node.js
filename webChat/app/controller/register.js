module.exports = function(){

	var _res = arguments[0];
	var _req = arguments[1];
	var name,email,sex,password,
	querystring = require('querystring');

	this.index = function(){
		 _res.render(VIEW + 'register.jade');
	}

	this.register = function(){
	//调用http_param模块中封装的方法，较为麻烦
	/*	
	lib.httpParam.POST('nickname',function(value){
			name = value;
			sessionLib.username = value;
		});
		lib.httpParam.POST('email',function(value){
			email = value;
		});
		lib.httpParam.POST('sex',function(value){
			sex = value;
		});
		lib.httpParam.POST('password',function(value){
			password = value;
		});
	}*/
	//直接使用node函数
		var postData = '';
		_req.addListener('data', function(value){
			postData += value;
		});
		
		_req.addListener('end',function(){
			//得到post值
			var post = querystring.parse(postData);
			//存入数据库，使用base_model中封装的函数
			// console.log(post);
			var db = new DB();
			var tableName = 'user';
			var rowInfo = {};
			rowInfo.nick_name = post.nickname;
			rowInfo.sex = post.sex;
			rowInfo.email = post.email;
			rowInfo.password = post.passwd;
			rowInfo.login_time = new Date().getTime();
			rowInfo.state = 1;
			//为什么会插入两次数据库，难道是刷新的缘故？
			db.insert(tableName,rowInfo,function(ret){
				if(ret>0){
					var room = lib.config.get(CONF + 'room.json', '');
					lib.session.username = rowInfo.nick_name;
					 _res.render(VIEW + 'main.jade', {'user' : rowInfo.nick_name, 'rooms' : room});
				}
				else{
					_res.writeHead(200, { 'Content-Type': 'text/plain' });
					_res.end('Register Failed\n');
				}
			});
		});
	}

}