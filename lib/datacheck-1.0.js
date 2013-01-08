/*
	1.0版本说明
	实现功能：数据类型有效性的检测
			  base功能的完善
	
	实现的功能
	1.1版本说明
	实现功能：数组排序
	
	1.2
	增加接口属性可以使用外接函数来处理，并支持访问未读取属性的读取。
*/
(function(w){
	var datatool = w.datatool || {};

	/**
	 * @description 描述关键字
	 */
	datatool.keys = ["order"];

	/**
	 * @description 正则表达式集合
	 */
	datatool.reg = {
		"_notNull":	/\w+/,
		"_img":		/\*.jpg|.gif|.png/,
		"_time":	/\d{1,2}:\d{1,2}:\d{1,2}/,
		"_number":	/\d+/,
		"_email":	/\w+/,
		"_phone":	/\w+/,
		"_zh-cn":	/\w+/
	};


	//校验
	datatool.verify = {};


	/**
	 * @description 格式化集合
	 */
	datatool.formater = {
		"formatNull":function(val){
				//对空数据进行统一处理
				return (val === null || val === undefined || val === "") ? "" : val; 
			},
		"formatDate":function(val, formatPatter){
				//val为要格式化的值，formatPatter为格式，如YY-mm-dd HH-MM-SS,可以参考别的库。
			}
	}

	/**
     *  @description 
     *		依赖datatool.formater 
     *		使用接口从目标数据中提取数据。
     *  
	 */
	datatool.deal = function(port, source){
		var mixData = {}, queue = [];
		
		$.each(port, function(k, v){
			var isKey = $.inArray(k, keys) > -1;
			
			if( !isKey && $.isArray(v) ){
				mixData[k] = [];
				
				for(var i = 0, l = source[k].length; i < l; i++){
					mixData[k].push( datatool.deal(port[k][0], source[k][i]) ); 
				}
			}else if( !isKey && $.isPlainObject( v ) ){
				mixData[k] = datatool.deal(port[k], source[k]) ; 
			}else if( !isKey ) {
				if($.type( v ) === "function"){
					//这里可以使用jquery的队列，我在这里只是简单的做了个队列
					queue.push({"target":mixData, "fn":v, "k": k, "source":source});
				}else{
					mixData[k] =  datatool.formater.formatNull( source[k] );
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
	
	datatool.sortCheck = function(){
		
	};
	datatool.typeCheck = function(){
		
	};
	w.datatool = datatool;
})(window)



