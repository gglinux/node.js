module.exports = function(){
	this._res;
	this._req;
	
	this.render = function(jade, param){
		this._res.render(VIEW + jade, param);
	}
}