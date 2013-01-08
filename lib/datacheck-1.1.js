/*
	1.0版本说明
	实现功能：数据类型有效性的检测
			  base功能的完善
	
	实现的功能
	1.1版本说明
	实现功能：数组排序
				order 的key，value，接口和数据必须是一致的。
	
	1.2
	增加接口属性可以使用外接函数来处理，并支持访问未读取属性的读取。
	
*/
(function(w){
	var datacheck = w.datacheck || {};
	var keys = ["order"];
	base = {
		"_notNull":	function(v){
			//console.log(v, "  -- ", v.length)
			return !!v.length;
		},
		"_img":		function(v){
			return /\.(jpg|gif|png)$/.test(v);
		},
		"_time":	function(v){
			return /^\d{1,2}:\d{1,2}:\d{1,2}$/.test(v)
		},
		"_number":	function(v){
			return $.type(v) === "number";
		},
		"_email":	/\w+/,
		"_phone":	/\w+/,
		"_zh-cn":	/\w+/,
		"_boolean" : function(v){
			return true === v || false === v;
		}, 
		"_deal":function(){
				//会使用接口文件去处理后台返回的数据。
			},
		"_formatNull":function(val){
				//对空数据进行统一处理
				return (val === null || val === undefined || val === "") ? "" : val; 
			},
		"_formatDate":function(val, formatPatter){
				//val为要格式化的值，formatPatter为格式，如YY-mm-dd HH-MM-SS,可以参考别的库。
			}
	}
	var  checkResult = {};
	datacheck.deal = function(port, kanData, KP){
		var mixData = {}, queue = [], KP = KP || "root";
		
		
		$.each(port, function(k, v){
			var isKey = $.inArray(k, keys) > - 1, keyPath = KP + "." + k;
			
			if( !isKey && $.isArray(v) ){
				mixData[k] = [];
				
				for(var i = 0, l = kanData[k].length; i < l; i++){
					mixData[k].push( datacheck.deal(port[k][0], kanData[k][i], keyPath + "[" + i + "]" ) ); 
				}
			}else if( !isKey && $.isPlainObject( v ) ){
				mixData[k] = datacheck.deal(port[k], kanData[k], keyPath) ; 
			//对于order数组的获取
			}else if ( k === "order" && $.isArray(v)){
				//暂时对数据的排序不进行递归类型检测，况且后台返回的数据也不一定有order相关数据。
				//mixData[k] = [];
				
				//for(var i = 0, l = kanData[k].length; i < l; i++){
				//	mixData[k].push( datacheck.deal(port[k][i], kanData[k][i]) ); 
				//}
			}else if( !isKey ) {
				if($.type( v ) === "function"){
					//这里可以使用jquery的队列，我在这里只是简单的做了个队列
					queue.push({"target":mixData, "fn":v, "k": k, "source":kanData});
				}else{
					mixData[k] =  base._formatNull( kanData[k] );
					try{
						//console.log(keyPath, "---")
						//console.log($.type( base["_"+v] ) === "regexp" ? base["_"+v].test(kanData[k]) : base["_"+v](kanData[k]), " --- ", kanData[k], "-------------");
						checkResult[keyPath] = $.type( base["_"+v] ) === "regexp" ? base["_"+v].test(kanData[k]) : base["_"+v](kanData[k]);
					}catch(e){
						console.log(e, v)
					}
				}	
			}
			
		});
		
		for(var i = 0, l = queue.length; i < l; i++){
			var el = queue[i];
			el.target[el.k] = el.fn.call(el.target, el.source[el.k]);
		}
		
		return mixData;
		//return checkResult;
		
	};
	
	datacheck.sortCheck = function(){
		
	};
	datacheck.typeCheck = function(port, kanData){
		this.deal(port, kanData);
		return checkResult;
	};
	
	//给datacheck赋予扩展的能力。	
	datacheck.fn = datacheck.prototype = {
		
	}
	w.datacheck = datacheck;
})(window)



