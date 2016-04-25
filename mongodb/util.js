/**
 * @type module 
 * @author danhuang
 * @time 2012-12-22
 * @desc desc util.js
 * 处理配置json文件的数据，读取
 */
var fs  = require('fs')
  , sys = require('util');
exports.get = function(fileName, key){
	var configJson = {};
    try{
        var str = fs.readFileSync(fileName,'utf8');
        configJson = JSON.parse(str);
    }catch(e){
        sys.debug("JSON parse fails")
    }
    return configJson[key];
}