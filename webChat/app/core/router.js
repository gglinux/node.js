/**
 *
 * @author danhuang 2013-03-07
 *处理路由规则1：静态文件资源2：网站小图标3：错误页面4：正确的模块和控制器
 */
var FAVICON = '/favicon.ico';

exports.router = function(res, req){
	var logInfo = {};
	// url解码，避免url路径出现中文字符
	var pathname = decodeURI(lib.url.parse(req.url).pathname);
	// 初始化http参数获取模块
	lib.httpParam.init(req, res);
	// 初始化session管理模块
	global.sessionLib = lib.session.start(res, req);
	// 获取http请求路径，使用斜杠获取请求的controller类名以及action方法
	var pathArr = pathname.split('/');
	// console.log(pathArr);
	// 弹出第一个空字符
	pathArr.shift();
	var model = pathArr.shift()
	  , controller = pathArr.shift()
	  , Class = '';
	  
	//  添加日志信息
	logInfo['pathname'] = pathname;
	// console.log(pathname);
	logInfo['model'] = model;//得到模型,ip后面的第一个参数login
	logInfo['controller'] = controller;//得到控制器，IP后面的第二个参数enterRoom
	
	// 过滤favicon请求
	if(pathname == FAVICON){
		return;
	}else if(pathname == '/'){
		//VIEW= __dirname/view;
		res.render(VIEW + 'index.jade');
		// console.log(VIEW);
		return;
	}
	// 当控制器或者模型有一个不存在时，返回不存在该资源
	// console.log('1111'+controller);
	// console.log('2222'+model);
	if(!controller || !model){
		returnDefault(res, 'can not find source');
		return;
	}
	console.log(CON);
	// 尝试require一个controller类名，如果失败则认为是一个静态资源文件请求
	//CON=—__dirname/app/controller
	try {
		Class = require(CON + model);
	}
	catch (err) {
		//请求不到实际的类，调用静态文件处理模块
		console.log('the class not exist,look for the static file;'+err);
		//调用静态文件处理模块，BASE_DIR:__dirname
		lib.staticModule.getStaticFile(pathname, res, req, BASE_DIR);
		return;
	}
	// console.log(Class);
	//不存在错误，则说明是请求正确的模块
	if(Class){
		var object = new Class(res, req);
		try{
			//执行object中的controller方法
			//call方法，调用另一个对象中的方法

			//假如为login模块的login方法
			object[controller].call();
		} catch(err){
			console.log('no this action'+err);
			//不存在该资源，转向404
			returnDefault(res, 'no this action');
			return;
		}
	} else {
		//不存在该资源，转向404
		returnDefault(res, 'can not find source');
		return;
	}
}

/**
 *
 * 默认404失败页面
 */
function returnDefault(res, string){
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.end(string);
}






