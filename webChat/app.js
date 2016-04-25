/**
 *	gglinux
 * 设置路径全局变量
 */
global.BASE_DIR = __dirname;
global.APP      = BASE_DIR + "/app/";
global.CON      = APP + "/controller/";
global.CORE     = APP + "/core/";
global.LIB      = BASE_DIR + "/node_modules/";
global.CONF     = BASE_DIR + "/conf/";
global.STATIC   = BASE_DIR + "/static/";
global.VIEW     = BASE_DIR + "/view/";
 
 /**
 * modules引入
 */
global.lib = {
	http        : require('http'), 
	fs          : require('fs'),
	url   	    : require('url'),
	querystring : require('querystring'),
	httpParam   : require(LIB + 'http_param'),
	staticModule: require(LIB + 'static_module'),
	router      : require(CORE + 'router'),
	action      : require(CORE + 'action'),
	jade        : require('jade'),
	socket      : require('socket.io'),
    path        : require('path'),
    parseCookie : require('connect').utils.parseCookie,
    session     : require(LIB + 'node_session'),
    util        : require('util'),
	config      : require(CORE + 'comm/util'),
}
//数据库
global.DB = require(LIB + 'base_model');

global.onlineList = {};
//function被加入到监听队列
global.app = lib.http.createServer(function(req, res) {
	//给res定义函数体，此时并没有执行
	res.render = function(){
		var template = arguments[0];//读取请求路径
		var options = arguments[1];//option是请求的用户名，类似于模板的输出参数
		// console.log(options);
		var str = lib.fs.readFileSync(template, 'utf8');
		//处理模板
		var fn = lib.jade.compile(str, { filename: template, pretty: true });
		// console.log(fn);
		var page = fn(options);
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(page);
		return;
	}
	//下面的语句一直在监听，当有新的请求时。自动运行
	lib.router.router(res, req);
}).listen(8000);
global.io = lib.socket.listen(app);



