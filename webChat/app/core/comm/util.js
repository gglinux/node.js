/**
 * @type module 
 * @author danhuang
 * @time 2012-12-22
 * @desc desc util.js
 */
 
/**
 *
 * get json configure file
 * @param fileName string
 * @param key string
 */
 var Config = {};
function get(fileName, key){
	// if it has read, read it from tmp config
	if(Config[fileName]){
		return Config[fileName][key] ? Config[fileName][key] : Config[fileName];
	}
	var configJson = {};
    try{
        var str = lib.fs.readFileSync(fileName,'utf8');
        configJson = JSON.parse(str);
    }catch(e){
        return {};
    }
    // add configure content to config tmp
    Config[fileName] = configJson;
    return configJson[key] ? configJson[key] : configJson;
}

/**
 *
 * get the file content
 * @param fileName string
 */
function getSource(fileName){
	// if it has read, read it from tmp config
	if(Config[fileName]){
		return Config[fileName] ? Config[fileName] : Config[fileName];
	}
	var str = '';
	
	try{
        var str = lib.fs.readFileSync(fileName,'utf8');
    }catch(e){
    	str = '';
    }
     // add configure content to config tmp
    Config[fileName] = str;
    return str;
}

/* exports function */
exports.get = get;
exports.getSource = getSource;


