/**
 *  @description 
 *		依赖datatool.formater 
 *		使用接口从目标数据中提取数据。
 *  
 */
var $ = require("./jquery");
var keys = ["order"];
var formater = require("./formater");

var mix = function(port, source){
		
	var mixData = {}, queue = [];
	
	$.each(port, function(k, v){
		var isKey = $.inArray(k, keys) > -1;
		
		if( !isKey && $.isArray(v) ){
			mixData[k] = [];
			
			for(var i = 0, l = source[k].length; i < l; i++){
				mixData[k].push( mix(port[k][0], source[k][i]) ); 
			}
			
		}else if( !isKey && $.isPlainObject( v ) ){
			mixData[k] = mix(port[k], source[k]) ; 
		}else if( !isKey ) {
			if(typeof v === "function"){
				//这里可以使用jquery的队列，我在这里只是简单的做了个队列
				queue.push({"target":mixData, "fn":v, "k": k, "source":source});
			}else{
				mixData[k] =  source[k] ;//formater.formatNull( source[k] );
			}	
		}
	});
	

	/*
	 * 执行队列中的函数。	
	 */
	for(var i = 0, l = queue.length; i < l; i++){
		var el = queue[i];
		el.target[el.k] = el.fn.call(el.target, el.source[el.k]);
	}
	
	return mixData;

};

exports.mix = mix;