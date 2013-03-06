//var reg = require("./lib/module/reg"),
	//JSON = require("./lib/module/json");

var datatool = {};
//datatool.reg = require("./lib/module/reg");
//datatool.formater = require("./lib/module/formater");
datatool.deal = require("./lib/module/deal");


var port = {
		"countTotal": "boolean",
		"order": [					//order 作为关键字用来检测result的排序结果
			{
				"title"	:"name",
				"type"	:"desc"
			}, 
			{
				"title"	:"speaker.name",
				"type"	:"asc"
			}
		],
		"pageNo": "number",
		"pageSize": "number",
		"result":[{
			//"coverPath": "img",							//这个是前台要的
			"tlength": "time",								//这个是前台要的
			"name": "notNull",								//这个是前台要的
			"recommendCount": function(v){
				//console.log(this.speaker.name)			//这里可以访问还未读取出来的this.speaker.name原理是，函数加入队列，在其他属性读取完开始执行。
				return this.speaker.name + " == " + v
			},												//这个是前台要的
			"speaker": {									
				"name": "notNull"							//这个是前台要的
			},
			"viewCount": "number"
		}]
	};

	var kanData = require("./data/kanData");
	var resultData = datatool.deal.mix(port, kanData.kanData);
	//console.log(JSON.stringify( resultData) )
	console.log(resultData)